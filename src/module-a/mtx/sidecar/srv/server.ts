import cds from "@sap/cds";
import xsenv from "@sap/xsenv";
import { Destination, Connectivity, JobScheduler, ServiceTags } from "./types/provisioning-types";
xsenv.loadEnv();

cds.on("served", () => {
  const { "cds.xt.SaasProvisioningService": provisioning } = cds.services;
  provisioning.prepend(() => {
    const LOG = cds.log("Provisioning"); // logging

    provisioning.on("UPDATE", "tenant", async (req, next) => {
      LOG.info("ON UPDATE");
      const tenantSubdomain = req.data.subscribedSubdomain;
      const tenantURL = `https://${tenantSubdomain}-${process.env.appDomain}`;
      await next();
      return tenantURL;
    });

    provisioning.on("DELETE", "tenant", async (req, next) => {
      LOG.info("ON DELETE");
      await next();
      return req.data.subscribedTenantId;
    });

    provisioning.on("dependencies", async (req, next) => {
      LOG.info("ON dependencies");
      const dependencies = await next();
      const services = xsenv.getServices({
        registry: { tag: ServiceTags.SaaS },
        connectivity: { tag: ServiceTags.Connectivity },
        destination: { tag: ServiceTags.Destination },
        jobScheduler: { tag: ServiceTags.Jobscheduler }
      });

      dependencies.push({ xsappname: (services.destination as Destination).xsappname });
      dependencies.push({ xsappname: (services.connectivity as Connectivity).xsappname });
      dependencies.push({ xsappname: (services.jobScheduler as JobScheduler).uaa.xsappname });

      console.table(dependencies);

      return dependencies;
    });
  });
});
