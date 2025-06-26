import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL·E ROUTES" });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("🟢 Prompt received:", prompt);

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }
    
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        size: "1024x1024",
      });

    console.log("🟢 OpenAI response:", response);

    const imageUrl = response.data[0].url;
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error("❌ OpenAI error:", error);
    res.status(500).json({
    message: `${error.status} ${JSON.stringify(error.response?.data || error.message)}`
  });
  }
});

export default router;
