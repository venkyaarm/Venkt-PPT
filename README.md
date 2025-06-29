🧠 AI PPT Generator using React + Gemini + Pexels
Generate PowerPoint-style slides using Google Gemini AI for smart content and Pexels API for stunning related images – all from a simple web interface.
________________________________________
✨ Features
•	🔍 Enter any topic and number of slides
•	🧠 Auto-generates slide titles and paragraphs using Gemini API
•	🖼️ Fetches one relevant image per slide using Pexels
•	🎯 Clear slide layout – Title, Image, Paragraph
•	⚡ Built with React + Vite for fast performance
________________________________________
📸 Demo
 
________________________________________
🚀 Getting Started
1. Clone the Repo
bash
CopyEdit
git clone https://github.com/yourusername/ai-ppt-generator.git
cd ai-ppt-generator
2. Install Dependencies
bash
CopyEdit
npm install
3. Add API Keys
Create a .env file in the root and add:
env
CopyEdit
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_PEXELS_API_KEY=your_pexels_api_key
💡 Example:
env
CopyEdit
VITE_GEMINI_API_KEY=AIzaSyD...yourKey...
VITE_PEXELS_API_KEY=OXU8cwkMcaVyOXum4Y02FgiUSbnlxUKygSyerIVnK6JBU6VtwkvIoHvd
4. Start the App
bash
CopyEdit
npm run dev
The app runs at:
🌐 http://localhost:5173/create-ai
________________________________________
🧩 Tech Stack
Tool	Purpose
React + Vite	Frontend Framework
Gemini API	AI content generation
Pexels API	Free relevant image fetching
Axios	API calls
CSS	UI styling
________________________________________
📄 Folder Structure
bash
CopyEdit
src/
│
├── components/
│   └── CreateWithAI.jsx     # Main generator component
│
├── App.jsx                  # App entry point
├── main.jsx                 # Vite entry
└── index.css                # Global styles
________________________________________
🧪 Example Prompts
•	Topic: "Machine Learning" | Slides: 3
•	Topic: "Allu Arjun" | Slides: 2
•	Topic: "Solar Energy" | Slides: 4
________________________________________
📌 Future Improvements
•	 Add Export to .pptx file feature
•	 Add Dark mode
•	 Add Voice input and speech synthesis
________________________________________
💡 Tips
•	Use clear, concise topics for best results
•	Use 1–5 slides for fastest generation
•	Ensure .env keys are valid and refreshed if expired
________________________________________
🙌 Credits
•	Google Gemini API
•	Pexels Developer API
•	React + Vite
AUTHOR:   venkyaarm@gmail.com

"# Venkt-PPT" 
