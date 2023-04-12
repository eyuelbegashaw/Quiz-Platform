import {useState} from "react";

import Quiz from "./Quiz";
import Categories from "../data/Categories";

import "react-toastify/dist/ReactToastify.css";
import {ToastContainer, toast} from "react-toastify";

const Home = () => {
  const [category, setCategory] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [difficulty, setDifficulty] = useState("easy");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (quantity > 0) {
        setLoading(true);
        const urlApi = `https://opentdb.com/api.php?amount=${quantity}&$category=${category}&difficulty =${difficulty}&type=multiple`;
        const fetchedQue = await fetch(urlApi);
        const data = await fetchedQue.json();
        const Questions = await data.results;
        setQuestions(Questions);
        setLoading(false);
        setQuantity(1);
      } else if (quantity <= 0) {
        toast.error("Amount must be greater than 0");
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-dark pt-5">
      <ToastContainer />
      <h1 className="text-center theme"> 🎉 WELCOME TO THE FUN 🥳 </h1>

      {questions.length === 0 ? (
        <div className="bg-dark d-flex justify-content-center vh-100 w-100">
          <div id="parentDiv">
            <h3 className="theme mt-5">Choose Category </h3>
            <select
              name="category"
              className="form-select form-select-lg bg-dark text-light mb-4"
              onChange={e => setCategory(e.target.value)}
            >
              {Categories.map((option, next) => (
                <option key={next} value={option.value}>
                  {option.category}
                </option>
              ))}
            </select>

            <h3 className="theme">Choose Difficuly level</h3>
            <select
              name="difficuly"
              className="form-select form-select-lg bg-dark text-light mb-4"
              onChange={e => setDifficulty(e.target.value)}
            >
              <option value="easy"> Easy </option>
              <option value="medium"> Medium </option>
              <option value="hard"> Hard </option>
            </select>

            <div>
              <h3 className="theme">Amount</h3>

              <input
                className="w-100 bg-dark border rounded text-white p-2"
                type="number"
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </div>

            <button className="btn btn-primary my-3 w-100" onClick={handleSubmit}>
              <div className="d-flex justify-content-center">
                <span className="fs-5">Submit</span>
                {loading && (
                  <div className="spinner-border text-white ms-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
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
