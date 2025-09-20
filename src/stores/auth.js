import { writable } from "svelte/store";

export const user = writable(null);

export function setAuth(userData) {
  user.set(userData);
}

export function clearAuth() {
  user.set(null);
}
