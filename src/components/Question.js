import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Question = ({question , handleNext , selected , handleAnswer})=> {

    const [options , setOptions] = useState([]); //holds the current options
    const navigate = useNavigate();


    useEffect( ()=> {
        if(question)
        {
            handleOption();
        }
        
    }, [question]);


    //handles the selected option colors
    const handleSelect = (option) =>  {
       if (option == question.correct_answer  )
          return "btn btn-success btn-lg w-100"
       else if(selected == option && selected !== question.correct_answer)
          return "btn btn-danger btn-lg w-100"
       else 
          return "btn btn-primary btn-lg w-100"  
    }

    //Makes the options random  
    const handleOption = ()=> {
        let optionTemp = [question.correct_answer , ...question.incorrect_answers];
        setOptions(optionTemp.sort( () => Math.random() - 0.5));  
    }

    //handle Quiz functionality
    const handleQuit =() => {
        navigate('/');
    }

    return(
        <>
            <p className="lead my-4 pt-0">{question && question.question}</p> 
            <div>
             {
                options &&
                options.map ((option , next)=> 
                       <div key={next} className="mt-3 w-100 border">
                            <button   
                            onClick = {(e)=>handleAnswer(e)} 
                            name={option} 
                            className={ selected ? handleSelect(option) :"btn btn-primary btn-lg w-100" } > 
                            {option}
                            </button>
                       </div>
                     
                )
             }
             </div>

            <div className="d-flex justify-content-between">
               <button className="btn btn-danger m-2 btn-lg" onClick={handleQuit}>Quit</button>  
               <button className="btn btn-success m-2 btn-lg" onClick={handleNext}>Next</button>   
            </div>
        </>
    );
}

export default Question;