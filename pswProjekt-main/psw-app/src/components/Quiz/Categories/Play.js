import React, { useState, useEffect, useRef } from 'react';
import '../style1.css'
import { useNavigate } from "react-router-dom";
import questionsGeography from '../Questions/Geography';

const Play = () => {
  
  // indeks aktualnego pytania
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(40);
  const inputRef = useRef(null);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [matchedAnswers, setMatchedAnswers] = useState([]);
  const [questions, setQuestions] = useState(questionsGeography)
  const navigate = useNavigate();

  useEffect(() => {
    setSortedAnswers(questions[currentQuestion].answersList);
  }, [questions, currentQuestion]);

  useEffect(() => {
    setMatchedAnswers(questions[currentQuestion].answersList);
    
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (currentQuestion === 15) {
      console.log("Koniec pytań")
      
    }
    else{
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);
        if (timeLeft === 0) {
        clearTimeout(timer);
        setCurrentQuestion(currentQuestion + 1);
        setScore(score - 1)
        setTimeLeft(40);
        }
        return () => clearTimeout(timer);
        }
        }, [currentQuestion, questions.length, score, timeLeft]);
  
  // koniec quizu - ranking
  const handleEnd1 = () => {
    navigate("/user-panel/ranking")
  }

  // koniec quizu - logout
  const handleEnd2 = () => {
    navigate("/")
  }
  
  // jednokrotny wybor + prawda/falsz
  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestion].correctAnswer) {
      console.log('correct')
      setScore(score + 1);
    }
    else{
      setScore(score - 1)
      console.log('bad')
    }
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(40);
  };

  // wielokrotny wybor
  const handleMultipleAnswers = (e) => {
    e.preventDefault();
    let selectedAnswers = [];
    let checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedAnswers.push(questions[currentQuestion].answersList.find((answer) => answer.text === checkbox.name));
      }
    });
    let correctAnswersCount = questions[currentQuestion].answersList.filter(answer => answer.correct).length;
    let allCorrect = true;
    if (selectedAnswers.length !== correctAnswersCount) {
        allCorrect = false;
    }
    else {
        selectedAnswers.forEach((answer) => {
          if (!answer.correct) {
            allCorrect = false;
          }
        });
    }
    if (allCorrect) {
      setScore(score + 1);
      console.log('correct multiple')
    }
    else{
      setScore(score - 1)
      console.log('bad multiple')
    }
    setCurrentQuestion(currentQuestion + 1);
}


  // krotka odpowiedz + wybór z listy + wypełnienie słów
  const handleShortAnswer = (e) => {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    if (inputValue === questions[currentQuestion].correctAnswer) {
      console.log('correct')
      setScore(score + 1);
    }
    else{
      setScore(score - 1)
      console.log('bad')
    }
    setCurrentQuestion(currentQuestion + 1);
    setTimeLeft(40);
  }
  
  {switch(questions[currentQuestion].type) {
    case 'singleChoice':
      return (
        // jednokrotny wybór
        <div className='single'>
            <p>&#9201; {timeLeft} seconds</p>
            <h2>Single choice question</h2>
            <h2>{questions[currentQuestion].question}</h2>
            {questions[currentQuestion].answersList.map((answer) => (
                <button onClick={() => handleAnswer(answer)}>{answer}</button>
            ))}
        </div>
      );

    case "trueFalse":
      // prawda fałsz
        return (
          <div className='single'>
            <p>&#9201; {timeLeft} seconds</p>
            <h2>Pick true or false</h2>
            <h2>{questions[currentQuestion].question}</h2>
            <button onClick={() => handleAnswer('true')}>true</button>
            <button onClick={() => handleAnswer('false')}>false</button>
          </div>
        );
        
    case "multipleChoice":
      // wielokrotny wybór
        return (
          <div className='single'> 
            <p>&#9201; {timeLeft} seconds</p>
            <h2>Multiple choice question</h2>
            <h2>{questions[currentQuestion].question}</h2>
            <form onSubmit={(e) => handleMultipleAnswers(e)}>
            {questions[currentQuestion].answersList.map((answer) => (
              <div>
                <input type="checkbox" name={answer.text} value={answer.correct} />
                <label>{answer.text}</label>
              </div>
          ))}
          <br></br>
          <input type="submit" value="Submit" />
            </form>
          </div>
          );

    case "shortAnswer":
      // krótka odpowiedź
      return(
        <div className='single'>
          <p>&#9201; {timeLeft} seconds</p>
          <h2>Answer the question</h2>
          <h2>{questions[currentQuestion].question}</h2>
          <input ref={inputRef} />
          <button onClick={(e) => handleShortAnswer(e)}>Submit</button>
        </div>
      );

    case "pickFrom":
      // wybór z listy
      return(
        <div className='single'>
          <p>&#9201; {timeLeft} seconds</p>
          <h2>Choose the answer from the list</h2>
          <h2>{questions[currentQuestion].question}</h2>
          <form onSubmit={(e) => handleShortAnswer(e)}>
          {questions[currentQuestion].answersList.map((answer) => (
            <div>
              <h3>{answer}</h3>
            </div>
          ))}
          <input ref={inputRef} />
          <input type="submit" value="Submit" />
          </form>
        </div>
      )

    case "fillIn":
      // wypełnienie słów
      return(
        <div className='single'>
          <p>&#9201; {timeLeft} seconds</p>
          <h2>Fill in the blank</h2>
          <h2>{questions[currentQuestion].question}</h2>
          <input ref={inputRef} />
          <button onClick={(e) => handleShortAnswer(e)}>Submit</button>
        </div>
      )

    case "sortElem":
      // sortowanie elementów

      const handleSort = (startIndex, endIndex) => {
        const result = Array.from(sortedAnswers);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setSortedAnswers(result);
      };

      const checkAnswer = () => {
        if (sortedAnswers.join(",") === questions[currentQuestion].correctAnswer.join(",")) {
          console.log('correct')
          setScore(score + 1);
        } else {
          console.log('bad')
          setScore(score - 1);
        }
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(40);
      };

      return (
        <div className='single'>
          
          <p>&#9201; {timeLeft} seconds</p>
          <h2>Sort elements</h2>
          <h2>{questions[currentQuestion].question}</h2>
          <div className='sortDiv'>
          <ul className='sortUl'>
            {sortedAnswers.map((answer, index) => (
              <li key={index}>
                <span>{answer}</span>{" "}
                <div>
                  <button className='submitButton' onClick={() => handleSort(index, index - 1)}>
                    &#9650;
                  </button>{" "}
                  <button className='submitButton' onClick={() => handleSort(index, index + 1)}>
                    &#9660;
                  </button>
                </div>
                
              </li>
            ))}
          </ul>
          <button className='submitSort' onClick={checkAnswer}>Check</button>
          </div>
        </div>
      );

    case "matchElem":

      const handleMove = (startIndex, endIndex) => {
        const result = Array.from(matchedAnswers);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setMatchedAnswers(result);
      }

      const checkMatch = () => {
        if (matchedAnswers.join(",") === questions[currentQuestion].correctAnswer.join(",")) {
          console.log('correct')
          setScore(score + 1);
        } else {
          console.log('bad')
          setScore(score - 1);
        }
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(40);
      };
      
        return (
      
          <div className="single">
            <p>&#9201; {timeLeft} seconds</p>
            <h2>Match elements</h2>
            <h2>{questions[currentQuestion].question}</h2>
            <div className="matchElemsMain">
              <div className="matchHeaders">
                <br></br>
                {questions[currentQuestion].elements1.map((answer) => (
                  <div>{answer}</div>
                ))}
              </div>
              <div className="matchElems">
                <br></br>
                <ul>
                {matchedAnswers.map((answer, index) => (
                  <li key={index}>
                    <span>{answer}</span>{" "}
                    <div className="match-elements__buttons">
                      <button className='submitButton' onClick={() => handleMove(index, index-1)}>Up</button>
                      <button className='submitButton' onClick={() => handleMove(index, index+1)}>Down</button>
                  </div>
                  </li>
                ))}
                </ul>
              </div>
            </div>
            <button onClick={checkMatch}>Submit</button>
          </div>
        );
      

    default:
      return (
        // strona końcowa
        <div className='single'>
           <h2>THE END!</h2>
           <h1>Your score is:</h1>
           <h1 className='score' >{score} / {questions.length - 1}</h1>
           <button className='startingButton' onClick={() => handleEnd1()}>See ranking</button>
           <button className='startingButton' onClick={() => handleEnd2()}>Log out</button>
        </div>
        )
    }}

  
};

export default Play;
