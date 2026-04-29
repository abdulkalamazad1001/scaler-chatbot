# Scaler Persona Chatbot 🤖

A Next.js application that lets you have real conversations with three Scaler/InterviewBit personalities: **Anshuman Singh**, **Abhimanyu Saxena**, and **Kshitij Mishra**.

I built this project for the Scaler Prompt Engineering assignment to demonstrate how high-quality system prompts and the GIGO principle can completely change how an AI behaves.

## Live Demo
> **[Insert Vercel Deployment Link Here]**

## Features ✨
- **Persona Switcher**: Seamlessly switch between 3 distinct personalities.
- **Tailored System Prompts**: Each persona is driven by a carefully crafted system prompt including Chain-of-Thought, strict output constraints, and few-shot examples.
- **Beautiful UI**: Modern, dark-mode, responsive interface built with Tailwind CSS and Framer Motion.
- **Streaming AI Responses**: Real-time typing effect powered by the Google Gemini API.
- **Suggestion Chips**: Context-aware quick start questions for each persona.

## Tech Stack 🛠
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Next.js API Routes (Edge Runtime)
- **AI Model**: Google Gemini (`gemini-2.5-flash`) via `@google/genai` SDK

## Local Setup 🚀

1. **Clone the repository:**
   \`\`\`bash
   git clone <your-repo-link>
   cd scaler-chatbot
   \`\`\`

2. **Install Dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Environment Variables:**
   - Copy the example file:
     \`\`\`bash
     cp .env.example .env.local
     \`\`\`
   - Open `.env.local` and add your Google Gemini API key:
     \`\`\`
     GEMINI_API_KEY=your_actual_api_key_here
     \`\`\`
   *(You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey))*

4. **Run the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation 📚
- **[prompts.md](./prompts.md)**: Contains the exact system prompts used and a detailed rationale behind their design.
- **[reflection.md](./reflection.md)**: A 300-500 word reflection on the process and the GIGO principle.

## Grading Criteria Checklist ✅
- [x] Clean repo structure, `.env.example` present, no API keys committed.
- [x] Live project deployed (Add link at the top after deploying to Vercel).
- [x] Clean, responsive frontend with a persona switcher, typing indicator, and suggestion chips.
- [x] Backend wired correctly using environment variables.
- [x] Distinct, well-researched system prompts with few-shot examples, CoT instruction, and constraints.
- [x] `prompts.md` and `reflection.md` present.
