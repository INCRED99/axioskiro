import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CarbonFootprintCalculator from '../components/games/CarbonFootprintCalculator';
import WasteSortingGame from '../components/games/WasteSortingGame';

const Games = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    {
      id: 1,
      title: "Carbon Footprint Calculator",
      description: "Calculate and reduce your environmental impact",
      icon: "🌍",
      color: "from-green-500 to-blue-500",
      component: "carbon-calculator",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Waste Sorting Challenge",
      description: "Learn proper waste segregation through drag & drop",
      icon: "♻️",
      color: "from-blue-500 to-purple-500",
      component: "waste-sorting",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Plant Species Quiz",
      description: "Identify Indian plant species from images",
      icon: "🌿",
      color: "from-green-500 to-teal-500",
      component: "plant-quiz",
      difficulty: "Hard"
    }
  ];

  if (activeGame) {
    return (
      <GameContainer 
        game={games.find(g => g.id === activeGame)}
        onBack={() => setActiveGame(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🎮 Environmental Games
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Learn about the environment through interactive games and simulations
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setActiveGame(game.id)}
            >
              <div className={`h-32 bg-gradient-to-r ${game.color} flex items-center justify-center`}>
                <div className="text-6xl">{game.icon}</div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {game.difficulty}
                  </span>
                  <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const GameContainer = ({ game, onBack }) => {
  const renderGame = () => {
    switch (game.component) {
      case 'carbon-calculator':
        return <CarbonFootprintCalculator />;
      case 'waste-sorting':
        return (
          <DndProvider backend={HTML5Backend}>
            <WasteSortingGame onComplete={(points) => console.log('Game completed with', points, 'points')} onBack={onBack} />
          </DndProvider>
        );
      case 'plant-quiz':
        return <PlantSpeciesQuiz />;
      default:
        return <div>Game not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-2xl">←</span>
            <span className="font-semibold">Back to Games</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800">{game.title}</h1>
            <p className="text-gray-600">{game.description}</p>
          </div>
          
          <div className="w-20"></div>
        </div>

        {renderGame()}
      </div>
    </div>
  );
};

const PlantSpeciesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const plantQuestions = [
    {
      id: 1,
      image: "🌳",
      question: "Which tree is known as the 'King of Trees' in India?",
      options: ["Banyan Tree", "Neem Tree", "Peepal Tree", "Mango Tree"],
      correct: 0,
      description: "The Banyan tree is considered sacred and is India's national tree."
    },
    {
      id: 2,
      image: "🌿",
      question: "Which plant is known for its medicinal properties and bitter taste?",
      options: ["Tulsi", "Neem", "Aloe Vera", "Mint"],
      correct: 1,
      description: "Neem is widely used in traditional medicine and has antibacterial properties."
    },
    {
      id: 3,
      image: "🌺",
      question: "Which flower is considered sacred in Hindu culture?",
      options: ["Rose", "Jasmine", "Lotus", "Marigold"],
      correct: 2,
      description: "The Lotus is India's national flower and symbolizes purity and beauty."
    },
    {
      id: 4,
      image: "🌱",
      question: "Which plant is known as 'Queen of Herbs'?",
      options: ["Tulsi", "Mint", "Coriander", "Curry Leaves"],
      correct: 0,
      description: "Tulsi (Holy Basil) is revered for its medicinal and spiritual significance."
    },
    {
      id: 5,
      image: "🥭",
      question: "Which tree produces India's national fruit?",
      options: ["Apple Tree", "Mango Tree", "Orange Tree", "Guava Tree"],
      correct: 1,
      description: "The Mango tree produces mangoes, which are India's national fruit."
    }
  ];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === plantQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < plantQuestions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold text-green-600 mb-4">{score}/{plantQuestions.length}</div>
          <p className="text-xl text-gray-600 mb-8">
            {score === plantQuestions.length ? "Perfect! You're a plant expert!" :
             score >= 3 ? "Great job! You know your plants well!" :
             "Keep learning about India's amazing plant diversity!"}
          </p>
          <button
            onClick={resetQuiz}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transition-all"
          >
            🔄 Play Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = plantQuestions[currentQuestion];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">Question {currentQuestion + 1} of {plantQuestions.length}</span>
          <span className="text-sm font-semibold text-gray-700">{Math.round(((currentQuestion + 1) / plantQuestions.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / plantQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-6">{currentQ.image}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-4 mb-8">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-50 text-blue-800'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && '✓'}
              </div>
              <span className="font-medium">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null}
          className={`px-8 py-4 rounded-xl font-semibold transition-all ${
            selectedAnswer !== null
              ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {currentQuestion + 1 === plantQuestions.length ? 'Finish Quiz' : 'Next Question'} →
        </button>
      </div>
    </div>
  );
};

export default Games;