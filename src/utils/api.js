import { apiTOKEN, baseURL } from "@/config/env";

/**
 * @param {String} url
 * @param {RequestInit} opt
 * @returns {Promise<any>}
 */
async function fetchJSON(url, opt) {
  return fetch(`${baseURL}/${url}`, {
    ...opt,
    headers: {
      "api-token": apiTOKEN,
    },
  })
    .then((res) => res.json())
    .then((json) => json);
}

export { fetchJSON };
