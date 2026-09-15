# Runtime-only image: `npm start` runs src/boot.ts directly via node's type
# stripping (no build step), so a separate bundler stage would only re-run
# npm ci. Node 26.8+ (26.0-26.5 leak Blob.prototype.stream(), nodejs/node#63574).
FROM node:26.8-slim

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

# Star CloudPRNT utility (vendored tarball, x86-64 .NET binary). Readable and
# executable by the unprivileged runtime user.
ADD ./cputil-linux-x64_v201.tar.gz /opt
RUN chmod -R a+rX /opt/cputil-linux-x64_v201 && \
  ln -s /opt/cputil-linux-x64_v201/cputil-linux-x64/cputil /usr/local/bin/cputil

# Own the working directory itself, not just the copied files: WORKDIR would
# create it root-owned and the app writes into its CWD.
RUN mkdir -p /webapp && chown node:node /webapp
WORKDIR /webapp

COPY --chown=node:node package*.json /webapp/
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node . /webapp/

# Provided by CI (--build-arg GIT_COMMIT=<sha>).
ARG GIT_COMMIT="n/a"
RUN echo "${GIT_COMMIT}" > /webapp/version.txt && chown node:node /webapp/version.txt

ENV PORT=3000
ENV NODE_ENV=production

USER node

# Shell-free probe (exit 1 on any failure — the old `|| exit` returned 0).
HEALTHCHECK --start-period=10s --interval=60s --timeout=5s --retries=3 \
  CMD ["node", "-e", "fetch('http://127.0.0.1:3000/graphql',{method:'POST',headers:{'content-type':'application/json'},body:'{\"query\":\"{shopInfo{_id}}\"}'}).then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"]

EXPOSE 3000

# = `npm start` (package.json) in exec form, without npm as the parent process.
CMD ["node", "--no-warnings", "--env-file", ".env.defaults", "--env-file-if-exists=.env", "--import", "./load_env.js", "./src/boot.ts"]
