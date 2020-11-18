import { app, dialog } from "electron";
import Tray from "./classes/Tray";
import client from "./client";

let tray: Tray;
if (!app.requestSingleInstanceLock()) app.quit();

app.once("ready", () => {
  tray = new Tray();

  const clientId = process.env.CLIENT_ID ?? "758984984085790720";
  client.login({ clientId });
});

async function fail(e: Error) {
  await dialog.showMessageBox({
    type: "error",
    title: app.name,
    message: "something un-epic happened :(",
    detail: `${e.message}\n${!app.isPackaged ? e.stack : undefined}`,
  });

  app.exit();
}

process.on("unhandledRejection", (e: Error) => fail(e));
process.on("uncaughtException", (e: Error) => fail(e));
