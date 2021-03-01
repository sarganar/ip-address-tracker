"use strict";
import { geoApiKey } from "./config.js";

// Using API from geo.ipify.org/
// if IP or domain are empty, return connection IP info

export async function getIPInfo({ ip, domain }) {
  ip = ip || "";
  domain = domain || "";

  const url = `
https://geo.ipify.org/api/v1?apiKey=${geoApiKey}&ipAddress=${ip}&domain=${domain}
`;

  console.log("[getIPInfo] Fecthing request... ");

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
