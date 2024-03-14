import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAIKEY
});

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

export {
  handleRequestTest,
  handleRequestGPT4
};
