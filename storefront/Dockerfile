FROM node:26.8-alpine AS bundler

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package* /usr/src/app/

ENV TZ="Europe/Amsterdam"
RUN npm ci

COPY . /usr/src/app/

ARG UNCHAINED_ENDPOINT=http://swiyu.unchained.wtf/graphql
ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://swiyu.unchained.wtf/graphql

ENV UNCHAINED_ENDPOINT=$UNCHAINED_ENDPOINT
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT=$NEXT_PUBLIC_GRAPHQL_ENDPOINT
ENV NEXT_TELEMETRY_DISABLED="1"

RUN npm run build && \
    rm -Rf node_modules

# Runtime: `next start` (not standalone — next.config.js loads node_env.js /
# file_env.js at server start for .env + *_FILE secrets, which the standalone
# server.js would skip). Node 26 ships full ICU; full-icu is not needed.
FROM node:26.8-alpine AS runtime

# Own the working directory itself: the app writes into its CWD (.next cache).
RUN mkdir -p /usr/src/app && chown node:node /usr/src/app
WORKDIR /usr/src/app

ENV NEXT_TELEMETRY_DISABLED="1"
ENV TZ="Europe/Amsterdam"
ENV NODE_ENV="production"

COPY --chown=node:node --from=bundler /usr/src/app/package* /usr/src/app/
RUN npm ci --omit=dev && npm cache clean --force
COPY --chown=node:node --from=bundler /usr/src/app /usr/src/app/

ARG GIT_COMMIT="n/a"
RUN echo "${GIT_COMMIT}" > /usr/src/app/version.txt && chown node:node /usr/src/app/version.txt

USER node

HEALTHCHECK --start-period=30s --interval=30s --timeout=5s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok||(r.status>=300&&r.status<400)?0:1),()=>process.exit(1))"]

EXPOSE 3000

# = `next start` without npm as the parent process.
CMD ["node", "node_modules/next/dist/bin/next", "start"]
