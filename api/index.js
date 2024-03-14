import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAIKEY
});
const express = require("express");
const cors = require("cors");

const app = express();

async function handleRequestTest(req, res) {
  try {
    const response = "ok this is a test";

    //将结果返回给客户端
    res.status(200).json(response);
  } catch (error) {
    const responseError = "this basic test is not working";
    res.status(500).json(responseError);
  }
}

async function handleRequestGPT4(req, res) {
  try {
    
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      messages: prompt,
      model: "gpt-4-turbo",
    });

    res.status(200).json(completion.choices[0]);
  } catch (error) {
    console.error('error---',error.message); // 只记录错误消息
  res.status(506).json({ error: error.message });
  }
}

app.use(express.json());

app.use(cors()); // Enable All CORS Requests

app.options('*', cors()) // Enable CORS preflight for all routes 测试跨域的时候开启这个地方

//Ending points

app.get("/handleRequestTest", handleRequestTest);


app.post("/handleRequestGPT4", handleRequestGPT4);

//Functions write here

app.listen(8080, function () {
  console.log("Server is running on port 8080");
});
