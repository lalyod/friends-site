import { writable } from "svelte/store";

export const currentRoute = writable(window.location.pathname);

/**
 * @param {String} path
 */
export function navigate(path) {
  history.pushState({}, "", path);
  currentRoute.set(path);
}

window.addEventListener("popstate", () => {
  currentRoute.set(window.location.pathname);
});
