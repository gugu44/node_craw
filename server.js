const express = require("express");
const cors = require("cors");
const { chromium } = require("playwright");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/crawl", async (req, res) => {
  const { url, type } = req.body;
  if (!url) return res.json({ error: "URL이 필요합니다." });
  if (!type) return res.json({ error: "타입이 필요합니다." });

  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });
    const content = await page.evaluate((type) => {
      if (type === "naver") {
        // 네이버 상품상세 주요 컨테이너 예시 selector (필요시 수정)
        const el = document.querySelector('#content');
        return el ? el.innerHTML : null;
      } else if (type === "tmall") {
        const el = document.querySelector('.tb-picks-container');
        return el ? el.innerHTML : null;
      } else if (type === "coupang") {
        // 쿠팡 상품상세: body 내 모든 이미지 src만 배열로 반환
        const imgs = Array.from(document.body.querySelectorAll('img'));
        return imgs.map(img => img.src);
      } else {
        return null;
      }
    }, type);
    await browser.close();
    if (content) {
      res.json({ content });
    } else {
      res.json({ error: `${type}에 맞는 요소가 없습니다.` });
    }
  } catch (err) {
    res.json({ error: "크롤링 실패: " + err.message });
  }
});

app.listen(3001, () => console.log("Server started on 3001")); 