// import env
const { APP_NAME, LISTEN_PORT } = require("./src/helpers/env");
// importexpressjs
const express = require("express");
// import cors
const cors = require("cors");
// import xss-clean
const xssClean = require("xss-clean");
// import helmet
const helmet = require("helmet");
// importbody-parser
const bodyParser = require("body-parser");
// import-dotenv
require("dotenv").config();
// import-route
const authRoute = require("./src/routes/auth.route");

const app = express();

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(xssClean());
app.use(cors());
app.use(bodyParser.json());

// insert here for router
app.use(authRoute);

app.use(express.static("public"));
app.listen(LISTEN_PORT || 9927, () => {
  console.clear();
  console.log(`${APP_NAME} RUN at port ${LISTEN_PORT}`);
});
