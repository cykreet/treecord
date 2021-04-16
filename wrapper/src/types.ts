import { Logger } from "@treecord/common";
import { Donation as APIDonation, Trees as APITrees } from "@treecord/api";

export namespace treecord {
  export interface Options {
    host?: string;
    logger?: Logger;
  }

  export interface Trees extends APITrees {}
  export interface Donation extends APIDonation {}
}
