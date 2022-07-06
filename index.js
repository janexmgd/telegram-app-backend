// import env
const { APP_NAME, PORT } = require("./src/helpers/env");
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
const socketio = require("socket.io");
const http = require("http");
const socketController = require("./src/socket");
// import-route
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/users.route");

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
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "*",
	},
});

// membuat koneksi ke socket io
io.on("connection", (socket) => {
	console.log("new user connected");
	// sebelum dipecah
	// socket.on("ping", (data) => {
	//   // console.log("PONG!!!!");
	//   // console.log(data);
	//   // bisa untuk menyimpan data
	//   socket.emit("ping-response", data);
	// });
	socketController(io, socket);
});

// insert here for router
app.use(authRoute);
app.use(userRoute);

app.use(express.static("public"));
app.get("/", (req, res) => {
	res.json("MADE WITH LOVE BY DENNY");
});
const port = PORT || 9927;
server.listen(port, "0.0.0.0", () => {
	console.log(`${APP_NAME} RUN at port ${port}`);
});
