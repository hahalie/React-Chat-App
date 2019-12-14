import express, { Application } from "express";

import http from "http";

const cors = require("cors");

const router: any = require("./router");

const PORT: string | 5000 = process.env.PORT || 5000;

const app: Application = express();

app.use(router);
app.use(cors);

const server: http.Server = http.createServer(app);


server.listen(PORT, () => console.log(`Server is started on ${PORT}`));