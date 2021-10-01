import { ILogObject, ISettingsParam, Logger as TSLogger } from "tslog";
import { IS_DEVELOPMENT } from "../constants";

export class Logger extends TSLogger {
  private static readonly DEFAULT_OPTIONS: ISettingsParam = {
    displayFilePath: "hidden",
    colorizePrettyLogs: IS_DEVELOPMENT,
    exposeErrorCodeFrame: IS_DEVELOPMENT,
    minLevel: IS_DEVELOPMENT ? "trace" : "info",
    prettyInspectHighlightStyles: { string: "green" },
    dateTimePattern: IS_DEVELOPMENT ? "hour:minute:second.millisecond" : undefined,
  };

  constructor(name?: string, settings?: Omit<ISettingsParam, "name">) {
    super(Object.assign(Logger.DEFAULT_OPTIONS, name, settings));
  }

  public log = (...args: any[]): ILogObject => this.info(...args);
}