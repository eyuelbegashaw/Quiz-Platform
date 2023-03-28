import {useState} from "react";

import Quiz from "./Quiz";
import Categories from "../data/Categories";

import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";

const Home = () => {
  const [category, setCategory] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");

  const handleSubmit = async () => {
    try {
      const urlApi = `https://opentdb.com/api.php?amount=10&$category=${category}&difficulty =${difficulty}&type=multiple`;
      const fetchedQue = await fetch(urlApi);
      const data = await fetchedQue.json();
      const Questions = await data.results;
      setQuestions(Questions);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-dark pt-5">
      {questions.length === 0 ? (
        <div className="bg-dark d-flex justify-content-center vh-100">
          <div>
            <h3 className="text-light mt-5">Choose Category </h3>
            <select
              name="category"
              className="form-select form-select-lg bg-secondary text-light mb-4"
              style={{width: 350}}
              onChange={e => setCategory(e.target.value)}
            >
              {Categories.map((option, next) => (
                <option key={next} value={option.value}>
                  {option.category}
                </option>
              ))}
            </select>

            <h3 className="text-light">Choose Difficuly level</h3>
            <select
              name="difficuly"
              className="form-select form-select-lg bg-secondary text-light mb-4"
              style={{width: 350}}
              onChange={e => setDifficulty(e.target.value)}
            >
              <option value="easy"> Easy </option>
              <option value="medium"> Medium </option>
              <option value="hard"> Hard </option>
            </select>

            <button className="btn btn-primary my-2 w-100" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <Quiz questions={questions} setQuestions={setQuestions} />
      )}
    </div>
  );
};

export default Home;
