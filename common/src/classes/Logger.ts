import { ILogObject, ISettings, ISettingsParam, Logger as TSLogger } from "tslog";
import { IS_DEVELOPMENT } from "../constants";

export const LOGGER_OPTIONS: ISettingsParam = {
  displayFilePath: "hidden",
  displayFunctionName: false,
  colorizePrettyLogs: IS_DEVELOPMENT,
  exposeErrorCodeFrame: IS_DEVELOPMENT,
  minLevel: IS_DEVELOPMENT ? "trace" : "info",
  prettyInspectHighlightStyles: { string: "green" },
};

// todo: nest doesn't play nice and throws a bunch of extra
// shit at the logger, so it should be filtered out
export class Logger extends TSLogger {
  constructor(settings?: ISettingsParam, parentSettings?: ISettings) {
    super(Object.assign(LOGGER_OPTIONS, settings), parentSettings);
  }

  log = (...args: any[]): ILogObject => this.info(...args);
}
