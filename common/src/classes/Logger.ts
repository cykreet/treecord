import { ILogObject, ISettings, ISettingsParam, Logger as TSLogger } from "tslog";
import { IS_DEVELOPMENT } from "../constants";

export const LOGGER_OPTIONS: ISettingsParam = {
  displayFilePath: "hidden",
  displayFunctionName: false,
  colorizePrettyLogs: IS_DEVELOPMENT,
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone, // local timezone
};

export class Logger extends TSLogger {
  constructor(settings?: ISettingsParam, parentSettings?: ISettings) {
    super(Object.assign(LOGGER_OPTIONS, settings), parentSettings);
  }

  log = (...args: any[]): ILogObject => super.info(...args);
}
