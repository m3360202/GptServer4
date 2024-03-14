const express = require("express");
const cors = require("cors");

import {
  handleRequestTest,
  handleRequestGPT4,
} from "./api";

const app = express();

app.use(express.json());

app.use(cors()); // Enable All CORS Requests

app.options('*', cors()) // Enable CORS preflight for all routes 测试跨域的时候开启这个地方

//Ending points

app.get("/handleRequestTest", handleRequestTest);


app.post("/handleRequestGPT4", handleRequestGPT4);

//Functions write here

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
