# EcoLearn India 🌱

A gamified environmental education platform for Indian schools and colleges, featuring interactive learning modules, games, quizzes, challenges, and real NGO participation opportunities.

## Features

- 🎮 **Interactive Games**: Carbon footprint calculator, waste sorting, plant species quiz
- 📚 **Learning Modules**: Climate change, renewable energy, biodiversity, water conservation
- 🧠 **Adaptive Quizzes**: 10/15/20 question options with real scoring
- 🏆 **Challenge System**: Friend codes, school competitions, leaderboards
- 🤝 **NGO Participation**: Real volunteer and donation opportunities
- 🤖 **AI Chatbot**: Gemini-powered environmental education assistant
- 🏫 **School Dashboard**: Organize challenges, track performance, manage students

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini 2.0 Flash
- **Drag & Drop**: React DnD
- **Icons**: Lucide React
- **Charts**: Recharts

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eco-learn-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development servers**
   
   **Backend Server (Terminal 1):**
   ```bash
   npm run server
   # Runs on http://localhost:3002
   ```
   
   **Frontend Server (Terminal 2):**
   ```bash
   npm run dev
   # Runs on http://localhost:3001
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3002
NODE_ENV=development

# Frontend Configuration
VITE_API_URL=http://localhost:3002
FRONTEND_URL=http://localhost:3001

# Application Settings
APP_NAME=EcoLearn India
APP_VERSION=1.0.0
```

### Available Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend API server
- `npm run server:dev` - Start backend with auto-restart (nodemon)
- `npm run build` - Build frontend for production
- `npm run build:server` - Build and start production server
- `npm run lint` - Run ESLint

## API Endpoints

### Backend Server (Port 3002)

- `GET /api/health` - Server health check
- `POST /api/chat` - Gemini AI chat endpoint
- `GET /api/environmental-data` - Environmental statistics
- `GET /` - Server information

### Frontend (Port 3001)

- All React routes with proxy to backend API

## Project Structure

```
eco-learn-india/
├── src/
│   ├── components/
│   │   ├── games/           # Game components
│   │   ├── GeminiChatbot.jsx
│   │   ├── Navbar.jsx
│   │   └── NewsMarquee.jsx
│   ├── contexts/            # React contexts
│   ├── pages/               # Page components
│   └── main.jsx
├── server.js                # Express backend server
├── .env                     # Environment variables (not in git)
├── .env.example            # Environment template
└── package.json
```

## Features Overview

### For Students
- Interactive environmental learning modules
- Gamified quizzes and challenges
- Eco-points reward system
- Real NGO participation opportunities
- AI-powered learning assistant

### For Schools
- Organize inter-school challenges
- Track student performance
- School leaderboards
- Performance analytics
- Challenge approval system

## Security

- API keys stored securely in environment variables
- CORS configured for specific origins
- Input validation on all endpoints
- No sensitive data in frontend code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please contact the development team or create an issue in the repository.

---

Built with ❤️ for environmental education in India 🇮🇳