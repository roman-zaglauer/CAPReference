import { Leafs, Roots, Root, Persons } from "#cds-models/CAPReferenceService";
import cds, { ApplicationService } from "@sap/cds";
import { CustomUIMessage, LeafValidator } from "./lib/core/validate-leafs";

export default class CDSReferenceService extends ApplicationService {
  /**
   * * Override Init
   */
  override async init() {
    const LOG = cds.log("CDSReferenceService"); // logging
    /**
     * * Persons
     * connect to external Business Partner service
     */
    const personsService = await cds.connect.to("API_BUSINESS_PARTNER");
    LOG.info("Connect to external service - API_BUSINESS_PARTNER");

    /**
     * * Action
     * handle action
     */

    /**
     * Calculate number of Leafs
     */
    this.after("READ", Roots, async (roots) => {
      LOG.info("After READ Roots");
      for (const element of roots) {
        element.numberOfLeafs = (
          await SELECT.from(Leafs).where({ roots_ID: element.ID })
        ).length;
      }
    });

    /**
     * * Persons
     * redirect calls to external Business Partner service
     */
    this.on("READ", Persons, (req) => {
      LOG.info("On READ Person");
      // if (!req.query.SELECT.where) {
      //   req.query.SELECT.where = [{ ref: ["CustomerAccountGroup"] }, "=", { val: "CUST" }];
      // } else {
      //   req.query.SELECT.where.push({ val: "and" }, { ref: ["CustomerAccountGroup"] }, "=", { val: "CUST" });
      // }
      return personsService.run(req.query);
    });

    /**
     * * Validations
     * Implementations of field validations
     */

    this.before("SAVE", Root, async (req) => {
      LOG.info("Before SAVE Roots");

      req.data.leafs.forEach((leaf) => {
        const leafValidator = new LeafValidator(leaf);
        const validationResult: CustomUIMessage[] = leafValidator.validate();

        validationResult.forEach((err) => {
          req.error(422, err.msg, err.target, err.args);
        });
      });
    });

    await super.init();
  }
}
