import { APIDonation, APITrees } from "@treecord/api";
import { Logger } from "tslog";

export namespace treecord {
  export interface Options {
    host?: string;
    logger?: Logger;
  }

  export interface Trees extends APITrees {}
  export interface Donation extends APIDonation {}
}
