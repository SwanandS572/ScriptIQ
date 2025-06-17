// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
} from '@google/genai';

export async function chatSession(input: string) {
    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY,
    });
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-1.5-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: `Generate professional, well-structured content based on the following input. Format the response using markdown with the following structure:

1. Start with a clear, bolded main title that summarizes the topic
2. Follow with a brief introduction (2-3 sentences)
3. Present the main content in a structured format:
   - Use bolded subtitles for each major point
   - Use nested bullet points for details and examples
   - Include relevant emojis where appropriate
4. End with a brief conclusion or call to action


${input}`,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });
    let result = '';
    for await (const chunk of response) {
        result += chunk.text;
    }
    return result;
}
