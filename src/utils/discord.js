import { discordConfig } from "@/config/env";

const basePath = "https://discord.com/api";

function discordSDK() {
  /**
   * @param {String} code
   */
  async function getToken(code) {
    const res = await fetch(`${basePath}/oauth2/token`, {
      method: "POST",
      body: new URLSearchParams({
        client_id: "1089840401994748044",
        client_secret: "discordConfig.CLIENT_SECRET",
        code: code,
        grant_type: "authorization_code",
        redirect_uri: discordConfig.REDIRECT_URI,
        scope: "identify",
      }).toString(),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return await res.json();
  }

  /**
   * @param {String} token
   */
  async function getMe(token) {
    const res = await fetch(`${basePath}/users/@me`, {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    if (res.status != 200) throw res.json();

    return await res.json();
  }

  return { getToken, getMe };
}

export default discordSDK;
