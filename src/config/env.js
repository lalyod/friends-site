export const API_TOKEN = import.meta.env["VITE_DISCLOUD_API_TOKEN"];
export const BOT_ID = import.meta.env["VITE_DISCLOUD_APP_ID"];
export const baseURL = "https://api.discloud.app/v2";

export const discordConfig = {
  REDIRECT_URI: import.meta.env["VITE_DISCORD_REDIRECT_URI"],
  GENERATED_URI: import.meta.env["VITE_DISCORD_GENERATED_URI"],
  CLIENT_SECRET: import.meta.env["VITE_DISCORD_CLIENT_SECRET"],
};
