import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEcoPoints } from '../contexts/EcoPointsContext';
import toast from 'react-hot-toast';

const Quiz = () => {
  const { addEcoPoints } = useEcoPoints();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  
  // Challenge context
  const challengeData = location.state;
  const isChallenge = challengeData?.isChallenge || false;
  const challengeId = challengeData?.challengeId;
  const challengeTitle = challengeData?.challengeTitle;

  useEffect(() => {
    if (isChallenge) {
      toast.success(`Starting quiz challenge: ${challengeTitle}`, {
        duration: 3000,
        icon: '🎯'
      });
    }
  }, [isChallenge, challengeTitle]);

  const allQuestions = [
    {
      id: 1,
      question: "What is the main cause of climate change?",
      options: [
        "Natural climate variations",
        "Greenhouse gas emissions from human activities",
        "Solar radiation changes",
        "Ocean current shifts"
      ],
      correct: 1,
      explanation: "Human activities, particularly burning fossil fuels, release greenhouse gases that trap heat in the atmosphere."
    },
    {
      id: 2,
      question: "Which renewable energy source is most abundant in India?",
      options: ["Wind energy", "Solar energy", "Hydroelectric power", "Geothermal energy"],
      correct: 1,
      explanation: "India receives abundant sunlight throughout the year, making solar energy the most abundant renewable resource."
    },
    {
      id: 3,
      question: "What percentage of Earth's water is freshwater?",
      options: ["10%", "5%", "2.5%", "1%"],
      correct: 2,
      explanation: "Only about 2.5% of Earth's water is freshwater, and most of it is frozen in ice caps and glaciers."
    },
    {
      id: 4,
      question: "Which gas contributes most to the greenhouse effect?",
      options: ["Carbon dioxide (CO2)", "Methane (CH4)", "Nitrous oxide (N2O)", "Water vapor (H2O)"],
      correct: 0,
      explanation: "While water vapor is the most abundant greenhouse gas, CO2 is the most significant contributor to human-caused climate change."
    },
    {
      id: 5,
      question: "What is biodiversity?",
      options: [
        "The variety of life in ecosystems",
        "The study of living organisms",
        "The process of evolution",
        "The classification of species"
      ],
      correct: 0,
      explanation: "Biodiversity refers to the variety of life forms in different ecosystems, including genetic, species, and ecosystem diversity."
    },
    {
      id: 6,
      question: "Which of the following is NOT a renewable energy source?",
      options: ["Solar power", "Wind power", "Natural gas", "Hydroelectric power"],
      correct: 2,
      explanation: "Natural gas is a fossil fuel and therefore not renewable, unlike solar, wind, and hydroelectric power."
    },
    {
      id: 7,
      question: "What is the 3 R's principle in waste management?",
      options: [
        "Reduce, Reuse, Recycle",
        "Remove, Replace, Restore",
        "Repair, Renew, Rebuild",
        "Refuse, Reduce, Reuse"
      ],
      correct: 0,
      explanation: "The 3 R's principle - Reduce, Reuse, Recycle - helps minimize waste and environmental impact."
    },
    {
      id: 8,
      question: "Which Indian city is known as the 'Garden City'?",
      options: ["Mumbai", "Delhi", "Bangalore", "Chennai"],
      correct: 2,
      explanation: "Bangalore is known as the 'Garden City' due to its numerous parks and green spaces."
    },
    {
      id: 9,
      question: "What is the Paris Agreement?",
      options: [
        "A trade agreement between countries",
        "An international climate change agreement",
        "A peace treaty",
        "An environmental protection law"
      ],
      correct: 1,
      explanation: "The Paris Agreement is an international treaty on climate change, adopted in 2015 to limit global warming."
    },
    {
      id: 10,
      question: "Which ecosystem is known as the 'lungs of the Earth'?",
      options: ["Grasslands", "Deserts", "Rainforests", "Tundra"],
      correct: 2,
      explanation: "Rainforests, especially the Amazon, are called the 'lungs of the Earth' because they produce oxygen and absorb CO2."
    },
    {
      id: 11,
      question: "What is carbon footprint?",
      options: [
        "The amount of carbon in soil",
        "Total greenhouse gas emissions caused by an individual or organization",
        "The size of carbon atoms",
        "Carbon content in food"
      ],
      correct: 1,
      explanation: "Carbon footprint measures the total amount of greenhouse gases produced directly and indirectly by human activities."
    },
    {
      id: 12,
      question: "Which Indian river is considered the most polluted?",
      options: ["Ganga", "Yamuna", "Narmada", "Godavari"],
      correct: 1,
      explanation: "The Yamuna river, especially in Delhi, is considered one of the most polluted rivers in India."
    },
    {
      id: 13,
      question: "What is sustainable development?",
      options: [
        "Development that meets present needs without compromising future generations",
        "Rapid economic growth",
        "Urban development only",
        "Industrial development"
      ],
      correct: 0,
      explanation: "Sustainable development meets the needs of the present without compromising the ability of future generations to meet their own needs."
    },
    {
      id: 14,
      question: "Which layer of the atmosphere contains the ozone layer?",
      options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
      correct: 1,
      explanation: "The ozone layer is located in the stratosphere, about 10-30 km above Earth's surface."
    },
    {
      id: 15,
      question: "What is the main cause of deforestation in India?",
      options: [
        "Natural disasters",
        "Agricultural expansion",
        "Climate change",
        "Industrial pollution"
      ],
      correct: 1,
      explanation: "Agricultural expansion is the primary cause of deforestation in India, as forests are cleared for farming."
    },
    {
      id: 16,
      question: "Which renewable energy source works best at night?",
      options: ["Solar power", "Wind power", "Tidal power", "Biomass"],
      correct: 1,
      explanation: "Wind power can generate electricity at night when winds are often stronger, unlike solar power which requires sunlight."
    },
    {
      id: 17,
      question: "What is eutrophication?",
      options: [
        "Water purification process",
        "Excessive nutrient pollution in water bodies",
        "Water conservation method",
        "Ocean acidification"
      ],
      correct: 1,
      explanation: "Eutrophication occurs when water bodies receive excess nutrients, leading to algae blooms and oxygen depletion."
    },
    {
      id: 18,
      question: "Which Indian state has the highest forest cover?",
      options: ["Madhya Pradesh", "Arunachal Pradesh", "Chhattisgarh", "Odisha"],
      correct: 0,
      explanation: "Madhya Pradesh has the highest forest cover in India, covering about 25% of the state's area."
    },
    {
      id: 19,
      question: "What is the greenhouse effect?",
      options: [
        "Cooling of Earth's atmosphere",
        "Trapping of heat in Earth's atmosphere",
        "Formation of clouds",
        "Ocean warming"
      ],
      correct: 1,
      explanation: "The greenhouse effect is the trapping of heat in Earth's atmosphere by greenhouse gases, keeping the planet warm."
    },
    {
      id: 20,
      question: "Which is the most energy-efficient mode of transport?",
      options: ["Car", "Bus", "Train", "Airplane"],
      correct: 2,
      explanation: "Trains are generally the most energy-efficient mode of transport for long distances, especially electric trains."
    }
  ];

  const startQuiz = (questionCount) => {
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffledQuestions.slice(0, questionCount);
    
    setCurrentQuiz(selectedQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === currentQuiz[currentQuestion].correct;
    const newUserAnswers = [...userAnswers, {
      question: currentQuiz[currentQuestion],
      selectedAnswer,
      isCorrect
    }];
    
    setUserAnswers(newUserAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentQuiz.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed
      const finalScore = isCorrect ? score + 1 : score;
      const percentage = (finalScore / currentQuiz.length) * 100;
      
      // Handle challenge completion
      if (isChallenge) {
        // Store challenge result for later processing
        const challengeResult = {
          challengeId,
          accuracy: Math.round(percentage),
          score: finalScore,
          total: currentQuiz.length,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('challenge_result', JSON.stringify(challengeResult));
        
        toast.success(`Challenge quiz completed with ${Math.round(percentage)}% accuracy!`, {
          duration: 3000,
          icon: '🎯'
        });
      } else {
        // Regular quiz - award points based on performance
        if (percentage === 100) {
          addEcoPoints(10, 'Perfect quiz score!');
        } else if (percentage >= 70) {
          addEcoPoints(5, 'Great quiz performance!');
        } else {
          addEcoPoints(2, 'Quiz completed!');
        }
      }
      
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setUserAnswers([]);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    return <QuizResult 
      score={score} 
      total={currentQuiz.length} 
      userAnswers={userAnswers}
      onRestart={resetQuiz}
      isChallenge={isChallenge}
      challengeTitle={challengeTitle}
    />;
  }

  if (currentQuiz) {
    return <QuizQuestion 
      question={currentQuiz[currentQuestion]}
      questionNumber={currentQuestion + 1}
      totalQuestions={currentQuiz.length}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNextQuestion}
      canProceed={selectedAnswer !== null}
    />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🧠 Environmental Quiz
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Test your knowledge about climate change, sustainability, and environmental conservation
          </p>
        </div>

        {/* Question Count Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Choose Quiz Length</h2>
          <p className="text-gray-600 text-center mb-8">
            Select how many questions you'd like to answer. Questions are randomly selected from our question bank.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[10, 15, 20].map((count) => (
              <div
                key={count}
                onClick={() => startQuiz(count)}
                className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 border-2 border-gray-200 hover:border-blue-500 cursor-pointer transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-4">{count}</div>
                  <div className="text-lg font-semibold text-gray-800 mb-2">Questions</div>
                  <div className="text-sm text-gray-600 mb-4">
                    Estimated time: {Math.ceil(count * 1.5)} minutes
                  </div>
                  <div className="text-sm text-green-600 font-semibold">
                    Earn up to 10 eco points
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-blue-50 rounded-xl p-6">
            <h3 className="font-bold text-blue-800 mb-3">🎯 Scoring System:</h3>
            <ul className="space-y-2 text-blue-700">
              <li>• <strong>Perfect Score (100%):</strong> +10 eco points</li>
              <li>• <strong>Great Performance (70%+):</strong> +5 eco points</li>
              <li>• <strong>Quiz Completion:</strong> +2 eco points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizQuestion = ({ question, questionNumber, totalQuestions, selectedAnswer, onAnswerSelect, onNext, canProceed }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-700">Question {questionNumber} of {totalQuestions}</span>
            <span className="text-sm font-semibold text-gray-700">{Math.round((questionNumber / totalQuestions) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{question.question}</h2>
          
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
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

          <div className="flex justify-end">
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                canProceed
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next Question →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuizResult = ({ score, total, userAnswers, onRestart, isChallenge, challengeTitle }) => {
  const navigate = useNavigate();
  const percentage = (score / total) * 100;
  
  const getPerformanceMessage = () => {
    if (percentage === 100) return "🎉 Perfect! You're an environmental expert!";
    if (percentage >= 80) return "🌟 Excellent! Great environmental knowledge!";
    if (percentage >= 70) return "👍 Good job! You know your environmental facts!";
    if (percentage >= 50) return "📚 Not bad! Keep learning about the environment!";
    return "🌱 Keep studying! Every step towards environmental knowledge counts!";
  };

  const handleBackToChallenges = () => {
    navigate('/challenges');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {isChallenge ? 'Challenge Quiz Complete!' : 'Quiz Complete!'}
          </h1>
          {isChallenge && challengeTitle && (
            <p className="text-lg text-blue-600 font-semibold mb-2">Challenge: {challengeTitle}</p>
          )}
          <p className="text-xl text-gray-700">{getPerformanceMessage()}</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-green-600 mb-4">{score}/{total}</div>
            <div className="text-2xl font-semibold text-gray-800 mb-2">{percentage.toFixed(1)}% Correct</div>
            <div className="text-lg text-gray-600">
              {isChallenge 
                ? `Challenge accuracy recorded: ${percentage.toFixed(1)}%` 
                : `You earned ${percentage === 100 ? '10' : percentage >= 70 ? '5' : '2'} eco points!`
              }
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-8">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="space-y-3">
            {isChallenge ? (
              <button
                onClick={handleBackToChallenges}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all shadow-lg"
              >
                🏆 Back to Challenges
              </button>
            ) : (
              <button
                onClick={onRestart}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all shadow-lg"
              >
                🔄 Take Another Quiz
              </button>
            )}
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Review Your Answers</h2>
          
          <div className="space-y-6">
            {userAnswers.map((answer, index) => (
              <div key={index} className={`p-4 rounded-xl border-2 ${
                answer.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold ${
                    answer.isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}>
                    {answer.isCorrect ? '✓' : '✗'}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{answer.question.question}</h3>
                    <p className={`text-sm mb-2 ${answer.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      Your answer: {answer.question.options[answer.selectedAnswer]}
                    </p>
                    {!answer.isCorrect && (
                      <p className="text-sm text-green-700 mb-2">
                        Correct answer: {answer.question.options[answer.question.correct]}
                      </p>
                    )}
                    <p className="text-sm text-gray-600">{answer.question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;