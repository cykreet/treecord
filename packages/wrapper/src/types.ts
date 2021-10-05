import { APIDonation } from "@uproot/api";
import { Logger } from "tslog";

export namespace uproot {
  export interface Options {
    host?: string;
    logger?: Logger;
  }

  export interface Donation extends APIDonation {}
}
