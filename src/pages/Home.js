import Categories from '../data/Categories';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Home  = ({fetchQuestions})=> {

    //Two state to hold category and difficulty
    const [category , setCategory] = useState(0);
    const [difficulty , setDifficulty] = useState("easy");
    const navigate = useNavigate();

    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        await fetchQuestions(category , difficulty);
        navigate('/quiz');
    }

    return (
        <>
           <div className="bg-dark d-flex justify-content-center vh-100" >
          
             <form onSubmit={ (e)=> handleSubmit(e) } >

               <h3 className="text-light mt-5">Choose Category </h3>
               <select name="category" className="form-select form-select-lg bg-secondary text-light mb-4" 
                style={{width:300}} onChange={(e) => setCategory(e.target.value) } >
                {
                    Categories.map( (option , next)=> 
                    <option key={next}   value={option.value}>{option.category}</option>  )
                }
                </select> 

                <h3 className="text-light">Choose Difficuly level</h3>
                <select name="difficuly"  className="form-select form-select-lg bg-secondary text-light mb-4" 
                style={{width:300}} onChange={(e) => setDifficulty(e.target.value) }
                >
                  <option value="easy" > Easy  </option>
                  <option value="medium" > Medium  </option>
                  <option value="hard" > Hard  </option>
                </select> 

                <input type="submit" className="btn btn-primary btn-lg m-2" />

            </form>    
        </div>
           
        </>
    )

}

export default Home;
