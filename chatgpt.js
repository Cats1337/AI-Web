import OpenAI from "openai";

async function rewriteContent({ discipline, knowledge, category, section, apiKey }) {
    try {
        const knowledgeLevels = ["Expert", "Advanced", "Intermediate", "Nvoice", "None"]; // Order of fallback levels
        let content = null;
        let usedLevel = null; // To log the level that provided the content

        // Initialize OpenAI with the user-provided API key
        const openai = new OpenAI({
            apiKey: apiKey,  // Use the provided API key
        });

        // Iterate through knowledge levels to find valid content
        for (const level of knowledgeLevels) {
            console.log(`Trying level: ${level}`); // Debug log
            const data = await getData(discipline, level, category, section, null);
            if (data && data.length > 0 && data[0].content) {
                content = data[0].content;
                usedLevel = level;
                break; // Exit loop once content is found
            }
        }

        if (!content) {
            throw new Error("No content found for the specified parameters at any knowledge level.");
        }

        console.log(`Content found at level: ${usedLevel}`); // Log the level that worked

        // Construct the rewrite prompt
        const prompt = `Rewrite the following content for someone in the ${discipline} field with ${knowledge} knowledge of Artificial Intelligence. The content belongs to the "${section}" section under the "${category}" category. Here is the content:\n\n"${content}"`;

        // Call OpenAI API to rewrite the content
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a professional technical writer that transforms text into easy-to-understand explanations based on someone's discipline and knowledge level." },
                { role: "user", content: prompt },
            ],
        });

        const rewrittenContent = response.choices[0]?.message?.content.trim();
        if (!rewrittenContent) {
            throw new Error("Failed to rewrite content.");
        }

        console.log('Rewritten Content:', rewrittenContent);
        return rewrittenContent;
    } catch (error) {
        console.error("Error rewriting content:", error.message);
        alert("An error occurred while rewriting content.");
    }
}