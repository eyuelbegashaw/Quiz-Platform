import {decode} from "html-entities";
import {useEffect, useState} from "react";

const Question = ({question, handleNext, selected, handleAnswer, setQuestions}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const handleOption = () => {
      let optionTemp = [question.correct_answer, ...question.incorrect_answers];
      setOptions(optionTemp.sort(() => Math.random() - 0.5));
    };

    if (question) {
      handleOption();
    }
  }, [question]);

  const handleSelect = option => {
    if (option == question.correct_answer) return "btn btn-success btn-lg w-100";
    else if (selected == option && selected !== question.correct_answer)
      return "btn btn-danger btn-lg w-100";
    else return "btn btn-primary btn-lg w-100";
  };

  return (
    <>
      <p className="lead my-4 pt-0">{question && decode(question.question)}</p>
      <div>
        {options &&
          options.map((option, next) => (
            <div key={next} className="mt-3 w-100 border">
              <button
                onClick={e => handleAnswer(e)}
                name={option}
                className={selected ? handleSelect(option) : "btn btn-primary btn-lg w-100"}
              >
                {decode(option)}
              </button>
            </div>
          ))}
      </div>

      <div className="d-flex justify-content-between">
        <button className="btn btn-danger m-2 btn-lg px-5" onClick={() => setQuestions([])}>
          Quit
        </button>
        <button className="btn btn-success m-2 btn-lg px-5" onClick={handleNext}>
          Next
        </button>
      </div>
    </>
  );
};

export default Question;
