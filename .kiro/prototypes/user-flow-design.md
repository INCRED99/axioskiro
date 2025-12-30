# EcoLearn India - User Flow & Prototype Design

## 🎭 User Journey Mapping

### Student User Flow
```
Registration → Home Dashboard → Learning Modules → Games → Quiz → Challenges → Leaderboard
     ↓              ↓              ↓           ↓       ↓         ↓           ↓
  Create Account  Overview     Interactive   Play    Test     Compete    Rankings
  Choose School   Stats        Simulations   Games   Knowledge with Friends View Progress
```

### School User Flow (Restricted Interface)
```
Registration → School Home → Create Challenge → Accept Challenge → Leaderboard → Performance
     ↓              ↓              ↓               ↓              ↓            ↓
  Create School  Dashboard    Organize Events   Join Others    View Rankings Track Students
  Account        Overview     for Students      Challenges     School Focus  Analytics
```

## 🎮 Game Flow Prototypes

### Waste Sorting Game
```
Start Game → Instructions → Drag Items → Drop in Bins → Score Feedback → Next Level
    ↓            ↓             ↓           ↓            ↓              ↓
  Welcome      Learn Rules   Interactive  Validation   Points Earned  Progression
  Screen       Display       Gameplay     Check        Celebration    Difficulty++
```

### Carbon Footprint Calculator
```
Input Data → Calculate → View Results → Breakdown Chart → Suggestions → Save Progress
    ↓           ↓           ↓             ↓               ↓             ↓
  Transport   Process     Total Carbon   Visual Graph   Improvement   Eco Points
  Energy      Emissions   Footprint      Analysis       Tips          Awarded
  Lifestyle   Algorithm   Display        Interactive    Actionable    Progress
```

## 📱 Interface Prototypes

### Learning Module Interface
```
┌─────────────────────────────────────┐
│ 📚 Climate Change Basics           │
│ ┌─────────────────────────────────┐ │
│ │ 🌡️ Interactive Simulation      │ │
│ │                                 │ │
│ │ [Temperature Controls]          │ │
│ │ [CO2 Level Slider]             │ │
│ │ [Feedback Loop Visualization]   │ │
│ │                                 │ │
│ │ Progress: ████████░░ 80%        │ │
│ └─────────────────────────────────┘ │
│ [◀ Previous] [Complete Module ▶]   │
└─────────────────────────────────────┘
```

### Challenge Creation Interface
```
┌─────────────────────────────────────┐
│ 🚀 Create Environmental Challenge  │
│                                     │
│ Title: [_____________________]      │
│ Type:  ○ Quiz  ● Real-world        │
│ Deadline: [📅 Select Date]         │
│ Reward: [50] Eco Points            │
│                                     │
│ Generated Code: [ABC123]            │
│ [📋 Copy Code] [🚀 Create]         │
└─────────────────────────────────────┘
```

### Leaderboard Interface
```
┌─────────────────────────────────────┐
│ 🏆 EcoLearn Leaderboard            │
│ [Individual] [Schools]              │
│                                     │
│ 🥇 #1 Priya Sharma    1,250 pts    │
│ 🥈 #2 Arjun Patel     1,180 pts    │
│ 🥉 #3 Sneha Gupta     1,050 pts    │
│ 👤 #4 Rahul Kumar       980 pts    │
│ 👤 #5 Anita Singh       920 pts    │
│                                     │
│ Your Rank: #12 (750 points)        │
└─────────────────────────────────────┘
```

## 🤖 AI Chatbot Flow
```
User Question → Frontend Validation → API Call → Gemini Processing → Response → Display
      ↓               ↓                  ↓           ↓                ↓         ↓
  "What is        Check input       POST request   AI generates    JSON       Formatted
  climate         not empty         to backend     environmental   response   message
  change?"        format            /api/chatbot   education       received   with context
                                                   focused answer
```

## 🎯 Gamification Elements

### Point System Design
```
Activity                Points    Frequency
─────────────────────────────────────────
Registration            1         One-time
Learning Module         3         Per module
Quiz (70%+ score)       5         Per attempt
Perfect Quiz (100%)     10        Per attempt
Game Completion         8         Per game
Challenge Win           15        Per challenge
NGO Participation       20        Per activity
```

### Progress Visualization
```
Module Progress: [████████░░] 4/5 Complete
Daily Streak:    [🔥🔥🔥] 3 days
Weekly Goal:     [██████░░░░] 60% to target
Achievement:     [🌱 Eco Warrior] Unlocked!
```

## 📊 Data Structure Prototypes

### User Object Structure
```javascript
{
  id: timestamp,
  name: "Student Name",
  email: "student@school.edu",
  userType: "student" | "school",
  school: "School Name",
  ecoPoints: 150,
  completedModules: [1, 2, 3],
  challengesWon: 2,
  joinDate: "2024-01-15",
  avatar: "profile-url"
}
```

### Challenge Object Structure
```javascript
{
  id: timestamp,
  title: "Clean Campus Challenge",
  type: "real-world",
  code: "ABC123",
  creator: "Green School",
  participants: ["user1", "user2"],
  deadline: "2024-02-01",
  reward: 50,
  checkIns: {
    "user1": { accuracy: 85, timestamp: "..." },
    "user2": { completed: true, timestamp: "..." }
  }
}
```

*User flows and prototypes designed using Kiro IDE collaborative development*