import { determineLeafs } from "#cds-models/CAPReferenceAPIService";
import cds, { ApplicationService } from "@sap/cds";

export default class CAPReferenceAPIService extends ApplicationService {
  /**
   * * Override Init
   */
  override async init() {
    const LOG = cds.log("CAPReferenceAPIService");
    /**
     * * Function Determine Leafs
     * determine the Leafs
     */
    this.on(determineLeafs, async (req) => {
      LOG.info("On determineLeafs");
      // const matchingEngine = new MatchingEngine(req.data.businessPartner, req.data.trade, req.data.postalCode);

      // return matchingEngine.run();
    });

    await super.init();
  }
}
