import { launch } from "chrome-launcher";
import lhMod from "lighthouse";
const lighthouse = lhMod.default ?? lhMod;

const chrome = await launch({
  chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
});
try {
  const { lhr } = await lighthouse(
    "http://localhost:4321/",
    { port: chrome.port, output: "json", logLevel: "error" },
    {
      extends: "lighthouse:default",
      settings: {
        formFactor: "mobile",
        screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false },
        throttlingMethod: "simulate",
      },
    },
  );

  console.log("LCP audits present:");
  for (const key of Object.keys(lhr.audits)) {
    if (key.toLowerCase().includes("lcp") || key.includes("largest") || key.includes("critical")) {
      const a = lhr.audits[key];
      console.log(`\n== ${key} ==`);
      console.log("  displayValue:", a.displayValue);
      console.log("  numericValue:", a.numericValue);
      console.log("  details.type:", a.details?.type);
      if (a.details?.items?.length) {
        for (const [i, it] of a.details.items.entries()) {
          if (i > 4) break;
          console.log(`  item[${i}]:`, JSON.stringify(it, null, 2).slice(0, 700));
        }
      }
    }
  }
} finally {
  await chrome.kill();
}
