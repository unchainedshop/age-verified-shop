import type { FastifyRequest, FastifyReply } from "fastify";
import type { Context } from "@unchainedshop/api";
import child_process from "node:child_process";
import util from "node:util";
import { createLogger } from "@unchainedshop/logger";
import { WorkerDirector, WorkerAdapter } from "@unchainedshop/core";
import type { IWorkerAdapter } from "@unchainedshop/core";

const logger = createLogger("gastro:print");

const execFile = util.promisify(child_process.execFile);


export const PrintLabel: IWorkerAdapter<{ name: string; company: string }, void> = {
  ...WorkerAdapter,
  key: "shop.unchained.cloudprnt",
  label: "Star Micronics CloudPRNT",
  version: "1.0",
  type: "CLOUDPRNT",
  external: true,
};

WorkerDirector.registerAdapter(PrintLabel);

export const allocateJob = async function (request: FastifyRequest<{
    Body: {
      printerMAC: string;
    };
  }> & { unchainedContext: Context },
  reply: FastifyReply) {
    try {
      const { stdout } = await execFile("cputil", [
        "mediatypes-mime",
        "image/png",
      ]);
      const supportedOutputs = JSON.parse(stdout as any);
      const mac = request.body.printerMAC.toUpperCase().trim();

      const newPrintJob = await request.unchainedContext.modules.worker.allocateWork({
        types: [PrintLabel.type],
        worker: mac,
      });

      if (!newPrintJob) {
        return reply.send({
            jobReady: false,
            mediaTypes: supportedOutputs,
            deleteMethod: "DELETE",
        });
      }

      logger.info(`job allocated/ready: ${newPrintJob._id} (${mac})`);
      return reply.send(
        {
          jobReady: true,
          jobToken: newPrintJob._id,
          mediaTypes: supportedOutputs,
          deleteMethod: "DELETE",
        },
      );
    } catch (e) {
      logger.error(e);
      return reply.status(503).send();
    }
  };

export const finishJob = async function (request: FastifyRequest & { unchainedContext: Context },
  reply: FastifyReply) {
    try {
      const { code, token, mac: rawMac } = request.query as any;
      const mac = rawMac.toUpperCase().trim();
      const codeAsNumber = parseInt(code.split(" ")?.[0], 10);

      const job = await request.unchainedContext.modules.worker.findWork({ workId: token });
      if (job.finished) {
        return reply.send();
      }
      const success = codeAsNumber >= 200 && codeAsNumber <= 299;

      await request.unchainedContext.modules.worker.finishWork(token, {
        error: success ? null : request.query,
        success,
        result: success ? request.query : null,
        worker: mac,
      });

      logger.info(`job finished with success: ${success} (${mac})`, {
        code,
        token,
      });
      return reply.send();
    } catch (e) {
      logger.error(e);
      return reply.status(503).send();
    }
  };

export const printJob = (createInputFile: any, formatSpec: string = "thermal3") => async function (request: FastifyRequest & { unchainedContext: Context },
  reply: FastifyReply) {
    try {
      const { token, type, mac: rawMac } = request.query as any;
      const mac = rawMac.toUpperCase().trim();

      const job = await request.unchainedContext.modules.worker.findWork({
        workId: token,
      });

      const inputFilePath = await createInputFile(job);

      const { stdout } = await execFile(
        "cputil",
        [formatSpec, "decode", type, inputFilePath, "-"],
        {
          encoding: "buffer",
        },
      );
      logger.info(`job data sent to printer: ${job._id} (${mac})`);
      return reply.header("Content-Type", type).send(stdout);
    } catch (e) {
      logger.error(e);
      return reply.status(503).send();
    }
  };
