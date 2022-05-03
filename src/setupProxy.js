const { createProxyMiddleware } = require("http-proxy-middleware");

const API_SERVICE_URL =
  "http://budgitapi-env.eba-82vtvuzm.eu-west-2.elasticbeanstalk.com";

module.exports = function (app) {
  app.use(
    "/budgitapi",
    createProxyMiddleware({
      target: API_SERVICE_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/budgitapi`]: "",
      },
    })
  );
};
