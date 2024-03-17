import express from "express";
import cors from "cors";
import fetch from "node-fetch";
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
    
    const { prompt } = req.body;
    console.log('prompt', prompt)
    fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      
      body: {
        model: 'gpt-4-0125-preview',
        messages: prompt,
        temperature: 0.2
      },
    }).then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); // Convert response to JSON
  }).then(data => {
      res.status(200).json(data); // Now 'data' should contain JSON data
  }).catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    });


}

async function handleRequestGPT3(req, res) {
    
  const { prompt } = req.body;
  console.log('prompt', prompt)
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    
    body: {
      model: 'gpt-3.5-turbo',
      messages: prompt,
      temperature: 0.2
    },
  }).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Convert response to JSON
}).then(data => {
    res.status(200).json(data); // Now 'data' should contain JSON data
}).catch((error) => {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  });


}

app.use(express.json());

app.use(cors()); // Enable All CORS Requests

app.options('*', cors()) // Enable CORS preflight for all routes 测试跨域的时候开启这个地方

//Ending points

app.get("/handleRequestTest", handleRequestTest);


app.post("/handleRequestGPT4", handleRequestGPT4);
app.post("/handleRequestGPT3", handleRequestGPT3);

//Functions write here

app.listen(8080, function () {
  console.log("Server is running on port 8080");
});
