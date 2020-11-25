import { app, dialog } from "electron";
import Tray from "./classes/Tray";
import client, { currentTimeout } from "./client";

export let failed: boolean;
let tray: Tray;

if (!app.requestSingleInstanceLock()) app.quit();

app.once("ready", () => {
  tray = new Tray();
  client.login({ clientId: process.env.CLIENT_ID ?? "758984984085790720" });
});

async function fail(e: Error) {
  failed = true;
  clearTimeout(currentTimeout);

  await dialog.showMessageBox({
    title: app.name,
    message: "something isn't right ┌( ಠ_ಠ)┘",
    detail: `${e.message}\n${!app.isPackaged ? e.stack : ""}`,
    type: "error",
  });

  app.exit(1);
}

process.on("uncaughtException", (e: Error) => fail(e));
process.on("unhandledRejection", (e: Error) => fail(e));
