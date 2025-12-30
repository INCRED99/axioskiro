# EcoLearn India - System Architecture & Design

## 🏗️ High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │  External APIs  │
│   (React+Vite)  │◄──►│  (Node.js)      │◄──►│  (Gemini AI)    │
│   Vercel        │    │   Render        │    │  Google         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  localStorage   │    │  Environment    │    │  Real-time AI   │
│  User Data      │    │  Variables      │    │  Responses      │
│  Progress       │    │  API Keys       │    │  Environmental  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Technology Stack

### Frontend Layer
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS + Custom Components
- **Routing**: React Router DOM
- **State Management**: Context API
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend Layer
- **Runtime**: Node.js with Express
- **AI Integration**: Google Generative AI (Gemini)
- **CORS**: Cross-origin resource sharing
- **Environment**: dotenv configuration

### Data Storage Strategy
- **User Data**: Browser localStorage (per-device)
- **Session Management**: Context-based authentication
- **Progress Tracking**: User-specific localStorage keys
- **Leaderboards**: Calculated from user data

## 🎯 Component Architecture

### Core Components
```
App.jsx
├── AuthContext (User management)
├── EcoPointsContext (Points & leaderboards)
├── Navbar (Navigation)
├── ProtectedRoute (Authentication guard)
└── Pages/
    ├── Home (Dashboard)
    ├── Learning (Interactive modules)
    ├── Games (Educational games)
    ├── Quiz (Knowledge testing)
    ├── Challenges (Friend competitions)
    ├── Leaderboard (Rankings)
    ├── Participate (NGO activities)
    └── SchoolDashboard (Institution view)
```

### Game Components
```
Games/
├── WasteSortingGame (Drag & drop)
├── CarbonFootprintCalculator (Interactive calculator)
└── EcosystemBalanceGame (Simulation)
```

## 🔄 Data Flow Design

### User Authentication Flow
```
1. User Registration → localStorage['ecolearn_users']
2. Login Validation → Check existing users
3. Session Creation → localStorage['ecolearn_user']
4. Context Update → Global user state
```

### Points & Progress Flow
```
1. Activity Completion → addEcoPoints()
2. User Update → updateUser() in AuthContext
3. Leaderboard Update → EcoPointsContext calculation
4. Progress Save → User-specific localStorage
```

### Challenge System Flow
```
1. Create Challenge → Generate unique code
2. Share Code → Friend joins challenge
3. Activity Completion → Track progress
4. Result Declaration → Compare performance
```

## 🌐 API Design

### Backend Endpoints
```
GET  /api/health          - Server health check
POST /api/chatbot         - AI chat interaction
```

### Frontend API Calls
```javascript
// Production: https://axioskiro-1.onrender.com
// Development: http://localhost:3002
const apiUrl = import.meta.env.PROD 
  ? 'https://axioskiro-1.onrender.com/api/chatbot'
  : '/api/chatbot';
```

## 🔐 Security Considerations

### Environment Variables
- `GEMINI_API_KEY`: Secure server-side storage
- `NODE_ENV`: Environment detection
- CORS configuration for production domains

### Data Privacy
- No sensitive data stored in localStorage
- Client-side only authentication (demo purposes)
- API key never exposed to frontend

## 📱 Responsive Design Strategy

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px  
- Desktop: 1024px+

### Mobile-First Approach
- Tailwind CSS responsive utilities
- Touch-friendly game interfaces
- Optimized navigation for small screens

*Architecture documented using Kiro IDE development workflow*