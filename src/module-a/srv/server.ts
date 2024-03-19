import cds from "@sap/cds";
import { Application, Response } from "express";
import helmet from "helmet";

cds.on("bootstrap", (app: Application) => {
  // app.use(helmet());

  app.get("/health", (_, res: Response) => {
    res.status(200).send("OK");
  });
});
