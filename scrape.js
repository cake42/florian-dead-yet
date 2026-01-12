const fs = require("fs");

const URL = "https://fabtcg.com/living-legend/";
const HERO = "Florian, Rotwood Harbinger";

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function main() {
  const res = await fetch(URL);
  if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
  const html = await res.text();

  // If Florian appears in the "LL ..." list, he is Living Legend
  const heroRe = new RegExp(`\\bLL\\s+${escapeRegex(HERO)}\\b`, "i");
  const isLivingLegend = heroRe.test(html);

  const out = {
    hero: HERO,
    isLivingLegend,
    source: URL,
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync("status.json", JSON.stringify(out, null, 2));
  console.log(`Florian Living Legend? ${isLivingLegend ? "YES" : "NO"}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
