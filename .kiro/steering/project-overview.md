# EcoLearn India - Environmental Education Platform

## Project Overview
This is a comprehensive web application for gamifying environmental education in Indian schools and colleges. The platform combines interactive learning, games, quizzes, and real-world participation opportunities.

## Key Features
- **Interactive Learning Modules**: Climate change simulations, renewable energy guides
- **Educational Games**: Waste sorting, carbon footprint calculator, ecosystem balance
- **Quiz System**: Environmental knowledge testing with eco-points rewards
- **Challenge System**: Friend-based environmental challenges with check-ins
- **NGO Participation**: Real links to environmental organizations
- **AI Chatbot**: Gemini-powered environmental education assistant
- **School Dashboard**: Specialized interface for educational institutions

## Technology Stack
- **Frontend**: React + Vite, Tailwind CSS, React Router
- **Backend**: Node.js + Express
- **AI Integration**: Google Gemini 2.5 Flash/Pro
- **Authentication**: Local storage based system
- **Games**: React DnD for interactive elements

## Development Guidelines
- Use real environmental data and links (no mock data)
- Focus on Indian environmental context
- Ensure educational value in all features
- Maintain responsive design for mobile/desktop
- Implement proper error handling and fallbacks

## API Endpoints
- `GET /api/health` - Server health check
- `POST /api/chatbot` - Gemini AI chat interface

## Environment Setup
- Frontend runs on port 3000
- Backend runs on port 3002
- Gemini API key stored in .env file
- CORS configured for local development