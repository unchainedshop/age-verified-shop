import type { FastifyInstance } from "fastify";
import type { IWorkerAdapter } from "@unchainedshop/core";
import { allocateJob, finishJob, printJob } from "./cloudprnt.ts";
import createInputFile from "./template.ts";
import { WorkerDirector, WorkerAdapter } from "@unchainedshop/core";

export const PrintLabel: IWorkerAdapter<{ name: string; company: string }, void> = {
  ...WorkerAdapter,
  key: "shop.unchained.cloudprnt",
  label: "Star Micronics CloudPRNT",
  version: "1.0",
  type: "CLOUDPRNT",
  external: true,
};

WorkerDirector.registerAdapter(PrintLabel);

export default (app: FastifyInstance) => {
  // app.use("/rest/cloudprnt", express.json({ limit: "50mb" })); // TODO: check if needed
  app.post("/rest/cloudprnt", allocateJob("CLOUDPRNT"));
  app.delete("/rest/cloudprnt", finishJob);
  app.get("/rest/cloudprnt", printJob(createInputFile, "thermal2"));
};