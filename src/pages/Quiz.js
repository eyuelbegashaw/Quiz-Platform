import {useState} from "react";
import {toast} from "react-toastify";

import Question from "../components/Question";

const Quiz = ({questions, setQuestions}) => {
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [gameOver, setGameOver] = useState(false);

  const handleNext = () => {
    if (selected) {
      setSelected("");
      if (current === questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrent(current + 1);
      }
    } else if (!gameOver) {
      toast.error("Please choose one of the following options");
    }
  };

  const handleAnswer = e => {
    if (!selected) {
      setSelected(e.target.name);
      if (e.target.name === questions[current].correct_answer) {
        setScore(score + 1);
      }
    }
  };

  return (
    <>
      {gameOver && (
        <div className="bg-dark text-warning fs-4 m-0 d-flex justify-content-center">
          <div>Quiz Completed</div>
          <div>
            <button className="btn btn-primary ms-2" onClick={() => setQuestions([])}>
              Play Again
            </button>
          </div>
        </div>
      )}
      <div className="row bg-dark mt-0 vh-100">
        <section className="col-sm-8 bg-dark text-light pt-3 px-3 text-start mx-auto mt-0">
          <div className="container mt-0">
            <div className="d-sm-flex align-items-center justify-content-between mt-0">
              <h1>
                Question : <span className="text-warning"> {current + 1} </span>{" "}
              </h1>
              <h2>
                Score : <span className="text-warning"> {score} </span>{" "}
              </h2>
            </div>

            <Question
              question={questions[current]}
              selected={selected}
              handleNext={handleNext}
              handleAnswer={handleAnswer}
              setQuestions={setQuestions}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Quiz;
