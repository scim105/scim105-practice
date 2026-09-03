/* =====================================================================
   Keeps the free Supabase project awake.

   A Supabase project on the Free plan is paused after 7 days with no
   requests to its database. During term the students keep it awake by
   themselves; over a holiday nobody does, and the project stops.

   This script sends one harmless read to the database. It takes the
   project address and the public "anon" key straight out of
   assets/config.js, so there is nothing to configure here and no secret
   to store: that key is already published inside the web page.

   Run by .github/workflows/keep-supabase-awake.yml, once a day.
   ===================================================================== */

import { readFileSync } from "node:fs";

const config = readFileSync(new URL("../../assets/config.js", import.meta.url), "utf8");
const pick = (name) =>
  (config.match(new RegExp(name + String.raw`\s*:\s*["']([^"']+)["']`)) || [])[1] || "";

const url = pick("SUPABASE_URL").replace(/\/+$/, "");
const key = pick("SUPABASE_ANON_KEY");

if (!url || !key || /PASTE-YOUR/.test(url) || /PASTE-YOUR/.test(key)) {
  console.error(
    "Could not find a real Supabase address and anon key in assets/config.js.\n" +
    "Open that file on GitHub and check that Step 7 of the setup guide was done."
  );
  process.exit(1);
}

const endpoint = url + "/rest/v1/weeks?select=week_no&limit=1";
console.log("Pinging " + url);

let response;
try {
  response = await fetch(endpoint, {
    headers: { apikey: key, Authorization: "Bearer " + key },
  });
} catch (err) {
  console.error("Could not reach the project at all: " + err.message);
  process.exit(1);
}

const body = (await response.text()).slice(0, 300);
console.log(response.status + " " + response.statusText + "  " + body);

/* 200 is a normal answer. 401 and 403 mean row level security refused the
   anonymous reader - which is correct, and the database was still touched.
   Anything from 500 up means the project is asleep or broken. */
if (response.status >= 500) {
  console.error(
    "\nThe project did not answer properly - it is probably paused.\n" +
    "Open https://supabase.com/dashboard , pick the project and press Restore project."
  );
  process.exit(1);
}

console.log("\nThe database answered. The project stays awake.");
