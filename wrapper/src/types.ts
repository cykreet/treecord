import { APIDonation } from "@treecord/api";
import { Logger } from "tslog";

export namespace treecord {
  export interface Options {
    host?: string;
    logger?: Logger;
  }

  export interface Donation extends APIDonation {}
}
