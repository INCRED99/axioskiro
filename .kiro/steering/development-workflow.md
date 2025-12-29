# Development Workflow for EcoLearn India

## Getting Started
1. Navigate to the project directory
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Start backend server: `npm run server` (port 3002)
5. Start frontend server: `npm run dev` (port 3000)

## Key Development Practices
- Always test both frontend and backend integration
- Use real environmental data sources (WHO, UN, Indian government)
- Implement proper error handling for API calls
- Test Gemini AI integration with various environmental questions
- Ensure mobile responsiveness for all components

## Testing Checklist
- [ ] Backend server starts without errors
- [ ] Frontend connects to backend via proxy
- [ ] Gemini chatbot responds to environmental questions
- [ ] All games are interactive and functional
- [ ] Learning modules complete properly and award points
- [ ] Authentication system works for both students and schools
- [ ] Real links in news marquee and NGO participation work

## Deployment Notes
- Ensure .env file is properly configured
- Test all external API integrations
- Verify CORS settings for production
- Check that all environmental links are current and functional