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

        body: JSON.stringify({
            model: 'gpt-4-turbo-preview',
            messages: prompt,
            temperature: 0.2
        }),
    }).then(data => {
        console.log('Success:', data);
        res.status(200).json(data);
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

//Functions write here

app.listen(8080, function () {
    console.log("Server is running on port 8080");
});
