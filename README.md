# Node.js + Playwright + React URL 크롤러

```bash
npm install express cors playwright
```

## 구성
- **server.js**: Node.js + Express + Playwright로 구성된 백엔드 크롤러 서버
- **(추후 생성) client/**: React 프론트엔드

## 백엔드 실행 방법
```bash
npm install
npm start
```

서버는 기본적으로 `http://localhost:3001`에서 실행됩니다.

##front 실행 new터미널 실행
```bash
cd client
npm install
npm start
```

## API
- `POST /crawl` : { url }을 받아 해당 페이지의 HTML을 반환

## 프론트엔드
- React로 URL 입력 폼 제공 (client 폴더에 생성 예정)

---

프론트엔드 생성 후, 추가 안내드리겠습니다. 