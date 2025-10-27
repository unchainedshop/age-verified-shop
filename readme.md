# Age Verified Shop

- Products can have one of these tags: spirit, beer-wine
- Users can have `User.ageVerification.age_over_16` of true/false and/or `User.ageVerification.age_over_18` of true/false


## Backend (./engine)

Node.js App with @unchainedshop framework, extended with userland code:
- Custom plugin to display only products and assortments that are allowed at a certain age
- Custom plugin to print order on a Star Micronics Receipt Printer through CloudPRNT
- REST API compatible with the CloudPRNT specification
- REST API Swiyu Verifier Webhook Handler
- GraphQL extension for Age Verification

## Frontend (./storefront)

Next.js App based on https://github.com/unchainedshop/unchained-storefront:
- AgeVerification*.tsx components (Modal, Button)
- Top Bar for AgeVerification to Layout
- Simplified Checkout
- "Blur" product cards in non-age-verified mode


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