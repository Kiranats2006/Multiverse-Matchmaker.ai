const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProfiles = async (user) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
    You are an AI matchmaker in the Marvel multiverse. 
    The user’s data is:
    - Username: ${user.username}
    - Bio: ${user.bio}
    - Interests: ${user.interests.join(", ")}

    Based on this, generate 10 potential matches from different Marvel multiverses. 
    Each match must have:
    - name
    - age
    - short bio (with multiverse twist)
    - 2 hobbies
    - which Marvel universe they belong to (e.g. Earth-616, Earth-1610, etc.)

    Return ONLY valid JSON (array of objects).
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    text = text.replace(/```json\n?|\n?```/g, ""); // cleanup formatting

    return JSON.parse(text);
  } catch (error) {
    console.error("❌ Error generating personalized profiles:", error);
    throw error;
  }
};

module.exports = { generateProfiles };
