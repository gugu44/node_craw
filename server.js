const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/crawl", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.json({ error: "URL이 필요합니다." });

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const content = await page.evaluate(() => {
      const el = document.querySelector('.tb-picks-container');
      return el ? el.innerHTML : null;
    });
    await browser.close();
    if (content) {
      res.json({ content });
    } else {
      res.json({ error: 'tb-picks-container 클래스를 가진 요소가 없습니다.' });
    }
  } catch (err) {
    res.json({ error: "크롤링 실패: " + err.message });
  }
});

app.listen(3001, () => console.log("Server started on 3001")); 