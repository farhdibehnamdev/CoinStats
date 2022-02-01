const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/v2/", {
      target: "https://api.coinranking.com",
      changeOrigin: true,

      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json; charset=utf-8; v=1.0",
        "x-access-token":
          // "coinranking7e31d54c3c76e8be08c570d010de2067d4a5cbc4efce6de2",
          "coinranking5285f097d126b3f8b581cdf2876e605280e1f51333636504",
      },
    })
  );
  app.use(
    createProxyMiddleware("/news", {
      target: "https://crypto-news15.p.rapidapi.com/",
      changeOrigin: true,

      headers: {
        "Accept-Language": "en",
        "Content-Type": "application/json; charset=utf-8; v=1.0",
        "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
        "x-rapidapi-key": "f8ff96b535msh420473f6105fe3fp1b4ce5jsn163c501e6b4f",
      },
    })
  );
};
