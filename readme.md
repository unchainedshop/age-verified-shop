# Age Verified Shop

A full-stack open-source web shop with e-id verification.
- Products can have one of these tags: spirit, beer-wine
- Users can have `User.ageVerification.age_over_16` of true/false and/or `User.ageVerification.age_over_18` of true/false

## Getting started

1. Install Node.js
2. `npm install`
3. `npm run dev`
4. Open http://localhost:4010 and setup shop with products
5. Open http://localhost:3000 and see storefront

To make e-ID verification work, setup a local verifier and set the SWIYU_VERIFIER_ENDPOINT (see .env.defaults). The setup process is documented here:
- https://swiyu-admin-ch.github.io/cookbooks/onboarding-base-and-trust-registry/
- https://swiyu-admin-ch.github.io/cookbooks/onboarding-generic-verifier/

## Stack / Technology

### Backend (./engine)

Node.js App with @unchainedshop framework, extended with userland code:
- Custom plugin to display only products and assortments that are allowed at a certain age
- Custom plugin to print order on a Star Micronics Receipt Printer through CloudPRNT
- REST API compatible with the CloudPRNT specification
- REST API Swiyu Verifier Webhook Handler
- GraphQL extension for Age Verification

### Frontend (./storefront)

Next.js App based on https://github.com/unchainedshop/unchained-storefront:
- AgeVerification*.tsx components (Modal, Button)
- Top Bar for AgeVerification to Layout
- Simplified Checkout
- "Blur" product cards in non-age-verified mode

**EventSource <-> GraphQL Subscriptions over SSE <-> Verifier**
In order to have max. speed verification we leverage SSE with GraphQL subscriptions and use modern browser technology `EventSource`:
1. A guest user is automatically generated for every user on the website
2. GraphQL Subscription created through SSE (`useRequestAgeVerification.ts`), creating a PubSub channel
3. Updated verification request is sent to the client via PubSub -> GraphQL Subscription over SSE (including app deep link)
4. User verifies the request, calls our verifier's API's which then calls the webhook handler on the Shop Backend
5. The Webhook handler (`swiyu-callback.ts`) updates the verification status of that guest user, then sends the updated verification request to the PubSub channel
6. Updated verification request is sent to the client via PubSub -> GraphQL Subscription over SSE


Alternatives considered:

**Polling / Stateless**
We could make the UI poll an endpoint every 0.3s or so instead of going the extra mile with SSE.

**Signed Cookies**
We could make `requestAgeVerification` anonymous and then store a server-side signed cookie with the age verification data. That way we could easily make it "expire" at midnight when the user is not 18 yet and also store the cookie only until the browser closes? Does it make sense to store the age verification data on the user like now? credentials could be shared?

## Docker Swarm Deployment

- Make sure you have deployed traefik in Docker Swarm with an internal "traefik" network
- Make sure you have a MongoDB server with an internal "db" network
- Create the `swiyu_mongo_url-2025-09-01` secret
- Create the `swiyu_unchained_secret-2025-09-01` secret (random string, you could use `uuidgen` for example)
- Adjust metadata.json, adjust VERIFIER_DID and DID_VERIFICATION_METHOD in swiyu-stack.yml base don official docs of Swiss Trust Infrastructure
- Adjust hostnames and other swarm labels to match your environment

Set env WEBHOOK_API_KEY_VALUE & SIGNING_KEY, then:
```
docker stack deploy -c swiyu-stack.yml --with-registry-auth swiyu
```