const express = require("express");
const routers = require("./src/routers");
const swaggerUi = require("swagger-ui-express");
const docs = require("./src/docs");
const https = require("https");
const fs = require("fs");

const cors = require("cors");
const app = express();

const options = {
	cert: fs.readFileSync("/etc/nginx/ssl/loocale_id.pem"),
	key: fs.readFileSync("/etc/nginx/ssl/private_key.pem"),
}
const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/loocale", routers);
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));

https.createServer(options, app).listen(port, () => {
	console.log(`Running on port ${port}`)
})

