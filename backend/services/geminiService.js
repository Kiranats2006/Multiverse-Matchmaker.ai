const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProfiles = async () => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    Generate 25 fictional dating profiles with Marvel superhero themes.
    Each profile should have: name, age, short bio, and 2 hobbies.
    Return ONLY valid JSON (array of objects).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Remove markdown fences if they exist
    let cleanText = text.replace(/```json\n?|\n?```/g, "");

    // Parse JSON safely
    let data;
    try {
      data = JSON.parse(cleanText);
    } catch (err) {
      console.error("❌ JSON parse failed. Raw response (first 500 chars):\n", cleanText.slice(0, 500));
      cleanText = cleanText
        .replace(/,\s*}/g, "}")   // remove trailing commas
        .replace(/,\s*]/g, "]");  // remove trailing commas
      data = JSON.parse(cleanText);
    }

    return data;
  } catch (error) {
    console.error("Error generating profiles:", error);
    throw error;
  }
};

module.exports = { generateProfiles };
