const express = require("express");
const routers = require("./src/routers");
const swaggerUi = require("swagger-ui-express");
const docs = require("./src/docs");

const cors = require("cors");
const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/loocale", routers);
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(docs));

app.listen(port, () => console.log(`Running on port ${port}`));
