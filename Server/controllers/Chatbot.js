// controllers/Chatbot.js

const axios = require("axios");

exports.Chatbot = async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `You're an AI assistant inside a custom LMS called ScholarX. This LMS includes authentication, course enrollment, video lectures, quizzes, and Razorpay integration. Your job is to help users navigate and learn using this system.\n\nNow, answer this query from the user: ${question}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    const answer =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini AI";

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Gemini Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Failed to connect to Gemini API",
      details: error.response?.data || error.message,
    });
  }
};
