const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateProfiles = async (user) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
You are an AI matchmaker in the Marvel multiverse.

User data:
- Username: ${user.username}
- Bio: ${user.bio}
- Interests: ${user.interests.join(", ")}

Generate 10 HOT multiverse variants of Marvel superheroes, make them attractive as potential matches. 
Each match must include:
- name (with multiverse hint)
- age
- bio (short, fun, multiverse twist)
- hobbies (array of 2)
- universe (e.g., Earth-616)

Return ONLY valid JSON (array of objects), no extra text.

Example format:
[
  {
    "name": "Spider-Man 2099",
    "age": 25,
    "bio": "A futuristic Peter Parker fighting corporate crime in New York 2099.",
    "hobbies": ["Parkour", "Photography"],
    "universe": "Earth-928"
  },
  {
    "name": "Iron Man Noir",
    "age": 38,
    "bio": "A darker Tony Stark during the Great Depression, fighting crime covertly.",
    "hobbies": ["Inventing", "Poker"],
    "universe": "Mars"
  }
]
`;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().trim();

      // Cleanup formatting
      text = text.replace(/```json\n?|\n?```/g, "").trim();
      if (!text) throw new Error("Empty response from Gemini");

      // Fix trailing commas
      text = text.replace(/,\s*}/g, "}").replace(/,\s*]/g, "]");

      const parsed = JSON.parse(text);

      // Ensure all fields exist
      const safeProfiles = parsed.map(p => ({
        name: p.name || "Unknown",
        age: p.age || null,
        bio: p.bio || "Bio not provided",
        hobbies: p.hobbies || ["Unknown"],
        universe: p.universe || "Unknown"
      }));

      return safeProfiles;

    } catch (err) {
      console.warn(`Attempt ${attempts} failed: ${err.message}`);
      if (attempts === maxAttempts) {
        console.error("❌ Failed to generate valid JSON after multiple attempts");
        throw err;
      }
      // small delay before retry
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
};

module.exports = { generateProfiles };
