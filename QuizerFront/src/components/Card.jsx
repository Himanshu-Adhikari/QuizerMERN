import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from '../assets/person.jpg'
const Card = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const activity = queryParams.get('activity');

  const navigate = useNavigate();


  useEffect(() => {
    if (category && activity) {
      axios.get('https://quizermern.onrender.com/api/questions', { params: { category, activity } })
        .then(response => {
          if (Array.isArray(response.data)) {
            setQuestions(response.data);
          } else {
            console.error('Unexpected data format:', response.data);
            setQuestions([]);
          }
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [category, activity]);

  const handleAnswerClick = (questionId, option) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (loading) {
    return(
<>
<div className="relative flex flex-col items-center justify-center min-h-screen bg-zinc-950">
  <div className="relative flex justify-center items-center">
    <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
    <img
      src={logo}
      className="rounded-full h-28 w-28"
      alt="Fetching"
    />
  </div>
  <div className="mt-6 text-lg font-semibold  text-zinc-300">
    Fetching Questions...
  </div>
</div>

</>
  )
  
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-zinc-950">
      {submitted ? (
  <div className="flex items-center justify-center min-h-screen bg-zinc-950">
  <div className="text-center space-y-4">
    <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
      Your Score: {score} / {questions.length}
    </h2>
    <button
      className="mt-4 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
      onClick={() => {
        navigate('/');
      }}
    >
      Main Page
    </button>
  </div>
</div>

  
      ) : (
        <div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {questions.map(question => (
              <div
              key={question.id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-300 bg-[url('https://i.pinimg.com/564x/84/f8/5a/84f85a08ac3eee7f305af97d0fc700df.jpg')] bg-cover"
            >
              <h3 className="text-lg font-semibold mb-2 border-b-2 border-zinc-900 pb-2">{question.question}</h3>
              <div className="mb-4">
                <p className="font-medium border-b border-gray-400 pb-2">Options:</p>
                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                  <button
                    className={`p-2 max-w-80 w-full rounded border ${selectedAnswers[question.id] === question.option1 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300'}`}
                    onClick={() => handleAnswerClick(question.id, question.option1)}
                  >
                    {question.option1}
                  </button>
                  <button
                    className={`p-2 max-w-80  w-full rounded border ${selectedAnswers[question.id] === question.option2 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300'}`}
                    onClick={() => handleAnswerClick(question.id, question.option2)}
                  >
                    {question.option2}
                  </button>
                  <button
                    className={`p-2 w-full max-w-80 rounded border ${selectedAnswers[question.id] === question.option3 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300'}`}
                    onClick={() => handleAnswerClick(question.id, question.option3)}
                  >
                    {question.option3}
                  </button>
                  <button
                    className={`p-2 rounded w-full max-w-80 border ${selectedAnswers[question.id] === question.option4 ? 'bg-blue-500 text-white' : 'bg-white border-gray-300'}`}
                    onClick={() => handleAnswerClick(question.id, question.option4)}
                  >
                    {question.option4}
                  </button>
                </div>
              </div>
            </div>
            
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white text-2xl py-2 px-6 rounded-lg shadow-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
