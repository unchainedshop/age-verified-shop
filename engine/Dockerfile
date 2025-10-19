FROM node:24 AS bundler

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=1

RUN wget https://cloudprnt.net/CloudPRNTSDK/cputil/cputil-linux-x64.tar.gz && \
  tar -xf cputil-linux-x64.tar.gz && \
  mkdir -p /opt/star && \
  mv cputil-linux-x64/* /opt/star && \
  ln -s /opt/star/cputil /usr/local/bin/cputil

# Install app dependencies
RUN mkdir -p /webapp
WORKDIR /webapp
COPY package* /webapp/

ENV PORT=3000
ENV NODE_ENV=production

RUN echo "${GIT_COMMIT}" > /webapp/version.txt && npm ci

COPY . /webapp/

HEALTHCHECK --start-period=10s --interval=60s --timeout=2s \
  CMD curl -f http://0.0.0.0:3000/graphql -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"{\n  shopInfo {\n    _id\n  }\n}\n"}' || exit

EXPOSE 3000

USER node

CMD ["npm", "start"]
