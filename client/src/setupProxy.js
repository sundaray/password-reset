const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    [
      "/api/users/login",
      "/api/users/register",
      "/api/download",
      "/account/forgot",
      "/account/reset/:token",
    ],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
