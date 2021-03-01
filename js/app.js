"use strict";
import { getIPInfo } from "./ipAPI.js";
import {
  upgradePanelInfo,
  uiInit,
  showPanelInfo,
  hidePanelInfo,
  showSpinner,
  hideSpinner,
  showMessage,
} from "./UI.js";
import { upgradeMap, mapInit } from "./map.js";

document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  uiInit();
  mapInit();

  const ipEntry = {}; // initial loading app request
  await requestIpInfo(ipEntry);
  hideSpinner();
  showPanelInfo();
}

export async function handleSubmit(ev) {
  ev.preventDefault();

  hidePanelInfo();
  showSpinner();

  let ipEntry = checkValidEntry(document.querySelector("#ip-entry").value);

  if (ipEntry.isCorrect) {
    ipEntry = await requestIpInfo(ipEntry);
  }

  if (ipEntry.isCorrect) {
    hideSpinner();
    showPanelInfo();
  } else {
    showMessage(ipEntry.msgError);
  }
}

async function requestIpInfo(ipEntry) {
  const ipInfo = await getIPInfo(ipEntry);
  console.log(ipInfo);

  if (!ipInfo.code) {
    upgradePanelInfo(ipInfo);
    upgradeMap(ipInfo);
    return { isCorrect: true };
  } else {
    //ej. code=400 -> Bad Request
    console.log("Bad Request");
    return {
      isCorrect: false,
      msgError: "Bad request. Please, try again.",
    };
  }
}

function checkValidEntry(ipFromInput) {
  const data = ipFromInput.trim();

  // IPv4 regex test
  let ipRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  let result = ipRegex.test(data);

  if (result) {
    return { ip: data, isCorrect: true };
  }

  // domain regex test
  ipRegex = /^(?!(https:\/\/|http:\/\/|www\.|mailto:|smtp:|ftp:\/\/|ftps:\/\/))(((([a-zA-Z0-9])|([a-zA-Z0-9][a-zA-Z0-9\-]{0,86}[a-zA-Z0-9]))\.(([a-zA-Z0-9])|([a-zA-Z0-9][a-zA-Z0-9\-]{0,73}[a-zA-Z0-9]))\.(([a-zA-Z0-9]{2,12}\.[a-zA-Z0-9]{2,12})|([a-zA-Z0-9]{2,25})))|((([a-zA-Z0-9])|([a-zA-Z0-9][a-zA-Z0-9\-]{0,162}[a-zA-Z0-9]))\.(([a-zA-Z0-9]{2,12}\.[a-zA-Z0-9]{2,12})|([a-zA-Z0-9]{2,25}))))$/;
  result = ipRegex.test(data);

  if (result) {
    return { domain: data, isCorrect: true };
  } else {
    console.log("Input incorrecto.");
    return {
      isCorrect: false,
      msgError: "Invalid input format. Please, try again.",
    };
  }
}
