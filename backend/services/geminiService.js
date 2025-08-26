const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProfiles = async (user) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
        You are an AI matchmaker in the Marvel multiverse.

        Here are example matches for other users:

        Example 1:
        {
        "name": "Peter Parker",
        "age": 21,
        "bio": "A friendly neighborhood hero from Earth-616, swinging between science and crime-fighting.",
        "hobbies": ["Photography", "Web-slinging practice"],
        "universe": "Earth-616"
        }

        Example 2:
        {
        "name": "Miles Morales",
        "age": 18,
        "bio": "A young Spider-Man from Earth-1610, learning to balance school, friends, and hero duties.",
        "hobbies": ["Graffiti art", "Skateboarding"],
        "universe": "Earth-1610"
        }

        Now, generate 10 new potential matches for this user based on their data:

        - Username: ${user.username}
        - Bio: ${user.bio}
        - Interests: ${user.interests.join(", ")}

        Each match must follow the same structure as the examples:
        - name
        - age
        - short bio (with multiverse twist)
        - 2 hobbies
        - which Marvel universe they belong to

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
