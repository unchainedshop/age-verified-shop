import Fastify from "fastify";
import { startPlatform } from "@unchainedshop/platform";
import {
  connect,
  unchainedLogger,
  fastifyRouter,
} from "@unchainedshop/api/lib/fastify/index.js";
import defaultModules from "@unchainedshop/plugins/presets/all.js";
import connectDefaultPluginsToFastify from "@unchainedshop/plugins/presets/all-fastify.js";
import typeDefs from "./api/schema.ts";
import resolvers from "./api/resolvers/index.ts";
import { useGraphQLSSE } from '@graphql-yoga/plugin-graphql-sse';
import connectREST from './api/rest/index.ts';
import connectCloudPRNT from './api/cloudprnt/index.ts';

import './plugins/age-restriction.ts';
import { FilterDirector } from "@unchainedshop/core";

const fastify = Fastify({
  loggerInstance: unchainedLogger("fastify"),
  disableRequestLogging: true,
  trustProxy: true,
});

try {
  FilterDirector.unregisterAdapter("shop.unchained.filters.strict-qual");
  FilterDirector.unregisterAdapter("shop.unchained.filters.local-search");
  
  const platform = await startPlatform({
    modules: defaultModules,
    healthCheckEndpoint: "/.well-known/yoga/server-health",
    typeDefs,
    resolvers,
    plugins: [
      useGraphQLSSE()
    ]
  });

  connect(fastify, platform, {
    allowRemoteToLocalhostSecureCookies: process.env.NODE_ENV !== "production",
  });
  connectDefaultPluginsToFastify(fastify, platform);
  connectREST(fastify);
  connectCloudPRNT(fastify);

  fastify.register(fastifyRouter, {
    prefix: "/",
  });

  await fastify.listen({
    host: "::",
    port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
