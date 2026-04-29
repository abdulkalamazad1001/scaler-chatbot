<div align="center">
  <h1>🎯 Scaler Persona Chatbot</h1>
  <p><em>An intelligent, persona-driven AI mentorship platform built for the Scaler Prompt Engineering assignment.</em></p>

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Google Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)](https://deepmind.google/technologies/gemini/)
  [![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://scaler-chatbot-three.vercel.app/)
</div>

---

## 🚀 Live Demo
Experience the app live: **[https://scaler-chatbot-three.vercel.app/](https://scaler-chatbot-three.vercel.app/)**

---

## 📖 Overview
The **Scaler Persona Chatbot** allows users to have highly contextual, authentic conversations with three key personalities from the Scaler/InterviewBit ecosystem:
- **Anshuman Singh** (Co-founder, Ex-Facebook)
- **Abhimanyu Saxena** (Co-founder, Ex-Fab.com)
- **Kshitij Mishra** (Head of Instructors, "DSA Maestro")

This application goes beyond generic LLM wrappers. It demonstrates the profound impact of **Prompt Engineering** and the **GIGO (Garbage In, Garbage Out)** principle by forcing the AI to strictly adhere to meticulously crafted system prompts.

---

## ✨ Next-Level Features
- **🎭 Context-Aware Persona Switching:** Instantly swap between mentors. The UI state and AI context cleanly reset to reflect the new personality.
- **🧠 Chain-of-Thought (CoT) Prompting:** The AI is instructed to reason step-by-step internally before responding, ensuring high-quality, logical advice rather than generic platitudes.
- **⚡ Real-Time Streaming:** Powered by the `@google/genai` SDK, responses stream into the UI character-by-character, creating an immersive, real-time chat experience.
- **💅 Premium UI/UX:** A stunning dark-mode interface built with Tailwind CSS, featuring glassmorphism elements, micro-animations (via Framer Motion), and intelligent suggestion chips.
- **🛡️ Graceful Error Handling:** If the API rate-limits or fails, the user receives a clean, friendly UI alert instead of a broken application.

---

## 🛠️ Technical Stack
- **Frontend:** Next.js 15 (App Router), React 19, Tailwind CSS
- **Animations & Icons:** Framer Motion, Lucide React
- **Markdown Parsing:** `react-markdown` for syntax highlighting and rich text rendering
- **Backend:** Next.js Edge API Routes
- **AI Engine:** Google Gemini

---

## 💻 Local Setup Instructions

If you want to run this project on your own machine:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/abdulkalamazad1001/scaler-chatbot.git
   cd scaler-chatbot
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   - Copy the example environment file:
     \`\`\`bash
     cp .env.example .env.local
     \`\`\`
   - Open \`.env.local\` and add your Google Gemini API key:
     \`\`\`env
     GEMINI_API_KEY=your_actual_api_key_here
     \`\`\`

4. **Start the Development Server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   *The application will be available at [http://localhost:3000](http://localhost:3000)*

---
<div align="center">
  <i>Built with ❤️ by Abdul Kalam Azad</i>
</div>
