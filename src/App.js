import Quiz from "./pages/Quiz";
import Home from "./pages/Home";

import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  //holds the fetched question
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async (category, difficulty) => {
    const urlApi = `https://opentdb.com/api.php?amount=10&$category=${category}&difficulty =${difficulty}&type=multiple`;
    const que = await fetch(urlApi);
    let data = await que.json();
    let queArray = await data.results;
    setQuestions(queArray);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home fetchQuestions={fetchQuestions} />} />
          <Route path="/quiz" element={<Quiz questions={questions} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
