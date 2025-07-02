import React, { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [type, setType] = useState("naver");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("http://localhost:3001/crawl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, type }),
      });
      const data = await res.json();
      setResult(data.content || data.error);
    } catch (err) {
      setResult("요청 실패: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>URL 크롤러</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <label>
            <input
              type="radio"
              name="type"
              value="naver"
              checked={type === "naver"}
              onChange={() => setType("naver")}
            />
            네이버 상품상세
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              name="type"
              value="tmall"
              checked={type === "tmall"}
              onChange={() => setType("tmall")}
            />
            Tmall
          </label>
          <label style={{ marginLeft: 16 }}>
            <input
              type="radio"
              name="type"
              value="coupang"
              checked={type === "coupang"}
              onChange={() => setType("coupang")}
            />
            쿠팡 상품상세
          </label>
        </div>
        <input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="크롤링할 URL 입력"
          style={{ width: 400, padding: 8 }}
        />
        <button type="submit" style={{ padding: 8, marginLeft: 8 }} disabled={loading}>
          {loading ? "크롤링 중..." : "크롤링"}
        </button>
      </form>
      <div style={{ background: "#f9f9f9", padding: 16, minHeight: 100, border: "1px solid #ddd" }}>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{result}</pre>
      </div>
    </div>
  );
}

export default App;
