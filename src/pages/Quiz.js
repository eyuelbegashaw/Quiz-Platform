import Question from '../components/Question';
import {useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';


const Quiz = ({questions})=> {

    const [current , setCurrent] = useState(0); //holds the current question index
    const [score , setScore] = useState(0);      //holds the score of player
    const [selected , setSelected] = useState(""); //holds the currently selected option
    const [alert , setAlert] = useState({show:false , type:"" , text:""});
    const [gameOver , setGameOver] = useState(false);

    const navigate = useNavigate();
 

    useEffect(()=>{
        if(questions == undefined ||questions.length ==0 )
        {
          navigate('/');
        }
    } , [questions]);

    //handle the next button 
    const handleNext = () => {
      if(selected)
      {
        setSelected("");
        if(current == questions.length-1)
        {
            setGameOver(true);
        }
        else
        {
          setCurrent(current+1);
        }
      }
      else if(!gameOver)
      {
        handleAlert({type:"danger" , text:"Please choose one of the following options"});
      }
      
    }

    //increase score by 1 if answer is correct
    const handleAnswer = (e)=> {
      if (!selected)
      {
        setSelected(e.target.name);
        if(e.target.name == questions[current].correct_answer )
        {
          setScore(score+1);
        } 
      }
     }

    //handle Alert
    const handleAlert = ({type , text}) =>{
      setAlert({show:true , type , text});
      setTimeout( () => setAlert({show:false}) , 5000);
        
    }

    return(
        <>
        {
        gameOver && 
         <div className='bg-dark text-warning fs-4 p-2 text-center m-0'>Quiz Completed <br />
          <button className='btn btn-primary mt-2' onClick={ ()=> navigate('/') }> Play Again </button> 
        </div> 
        }
        {alert.show && <Alert  type={alert.type}  text={alert.text}  /> }
        <div className="row bg-dark mt-0 vh-100">
          <section className="col-sm-8 bg-dark text-light p-3 text-start mx-auto mt-0">
            <div className="container mt-0">
              <div className="d-sm-flex align-items-center justify-content-between mt-0">
                <h1>Question : <span className="text-warning"> {current+1} </span> </h1>
                <h2>Score : <span className="text-warning"> {score} </span> </h2>
              </div>  

                <Question 
                question={questions[current]} 
                selected={selected}  
                handleNext={handleNext} 
                handleAnswer={handleAnswer} 
                />

            </div>
          </section>    
        </div>
                                  
            
         </>
    );
}

export default Quiz;