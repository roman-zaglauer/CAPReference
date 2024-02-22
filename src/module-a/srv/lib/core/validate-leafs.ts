import { Leaf } from "#cds-models/schema";
import { DateTime } from "luxon";

/**
 * *Class leaf Validator
 * Validations for the entity leaf
 */
export class LeafValidator {
  private leaf: Leaf;

  /**
   * *Constructor
   * @param leaf Leaf Entity
   */
  public constructor(leaf: Leaf) {
    this.leaf = leaf;
  }

  /**
   * *Validate
   * Run validations for the entity leaf
   * @returns An array of `CustomMessage` objects
   */
  public validate(): CustomUIMessage[] {
    let errors: CustomUIMessage[] = [];
    this.validateDates(errors);
    return errors;
  }

  /**
   *
   * @param errors An array of `CustomMessage` objects
   */
  private validateDates(errors: CustomUIMessage[]) {
    const validFrom = DateTime.fromISO(this.leaf.validFrom);
    const validTo = DateTime.fromISO(this.leaf.validTo);
    let error: CustomUIMessage;

    // Check if the date is valid.
    if (!validFrom.isValid) {
      error = {
        msg: "ERROR_INVALID_DATE",
        target: `in/roots(ID=${this.leaf.roots_ID},IsActiveEntity=false)/leafs(ID=${this.leaf.ID},IsActiveEntity=false)/validFrom`,
      };
      console.log(error);
      errors.push(error);
    }
    // Check if the date is valid.
    if (!validTo.isValid) {
      error = {
        msg: "ERROR_INVALID_DATE",
        target: `in/roots(ID=${this.leaf.roots_ID},IsActiveEntity=false)/leafs(ID=${this.leaf.ID},IsActiveEntity=false)/validTo`,
      };
      console.log(error);
      errors.push(error);
    }

    // Check if the fromDate is before the toDate.
    if (validTo < validFrom.plus({ days: 1 })) {
      error = {
        msg: "ERROR_INVALID_DATE_INTERVAL",
        target: `in/leafs(ID=${this.leaf.ID},IsActiveEntity=false)/validFrom`,
      };
      console.log(error);
      errors.push(error);

      error = {
        msg: "ERROR_INVALID_DATE_INTERVAL",
        target: `in/leafs(ID=${this.leaf.ID},IsActiveEntity=false)/validTo`,
      };
      console.error(error);
      errors.push(error);
    }
  }
}

export type CustomAPIMessage = {
  msg: string;
};

export type CustomUIMessage = CustomAPIMessage & {
  target: string;
  args?: string[];
};
