import { handleSubmit } from "./app.js";

let onlyInfo, spinner;
let styleOnlyInfo;

export function uiInit() {
  const ipForm = document.querySelector("#ip-form");
  ipForm.addEventListener("submit", handleSubmit);

  onlyInfo = document.querySelector(".only-info");
  styleOnlyInfo = onlyInfo.style.display;
  onlyInfo.style.display = "none";

  spinner = document.querySelector(".spinner");
}

export function showPanelInfo() {
  onlyInfo.style.display = styleOnlyInfo;
}

export function hidePanelInfo() {
  if (onlyInfo.style.display != "none") {
    styleOnlyInfo = onlyInfo.style.display;
    onlyInfo.style.display = "none";
  }
}

export function showSpinner() {
  spinner.style.display = "block";
}

export function hideSpinner() {
  spinner.style.display = "none";
}

export async function upgradePanelInfo(ipInfo) {
  const {
    ip,
    location: { city },
    location: { country },
    location: { postalCode },
    location: { timezone },
    isp,
  } = ipInfo;

  const ipValue = document.querySelector("#ip-value");
  const locValue = document.querySelector("#loc-value");
  const utcValue = document.querySelector("#utc-value");
  const ispValue = document.querySelector("#isp-value");

  ipValue.textContent = ip;
  locValue.textContent = `${city}${getExtraInfo(country, postalCode)}`;
  utcValue.textContent = timezone;
  ispValue.textContent = isp;
}

const getExtraInfo = (country, postalCode) =>
  country ? `, ${country} ${postalCode}` : "";

export function showMessage(msg) {
  const msgDiv = document.querySelector(".messages");
  msgDiv.textContent = msg;

  hideSpinner();
  hidePanelInfo();
  msgDiv.style.display = "block";

  setTimeout(() => {
    msgDiv.style.display = "none";
    showPanelInfo();
  }, 3000);
}
