import React, { useReducer, useRef } from "react";
import './style1.css'
import { formReducer, INITIAL_STATE } from "./formReducer";

const QuestionForm = () => {

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE)
  const answersRef = useRef()

  const handleChange = (e) => {
    dispatch({
      type:"CHANGE_INPUT", 
      payload:{name:e.target.name, value:e.target.value}})
  }

  const handleAnswers = () => {
    const ans = answersRef.current.value.split(",").map(answer => answer.trim());
    dispatch({ type: "ADD_ANSWERS", payload: ans });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAdding = () => {
    console.log(state)
  }

  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label className="typeLabel">
        <h3>Question Type:</h3>
        <select>
          <option value="">Select a type</option>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="truefalse">True/False</option>
          <option value="short">Short Answer</option>
          <option value="list">List Selection</option>
          <option value="fill">Fill in the Blank</option>
          <option value="sort">Sort</option>
          <option value="match">Match</option>
        </select>
      </label>
      <div className="formLabels">
        <label>
          <h4>Question:</h4>
          <input
          type="text"
          placeholder="Question"
          name="question"
          onChange={handleChange}
          />
        </label>
        <label>
          <h4>Answers List:</h4>
          <textarea 
          placeholder="Answers"
          ref={answersRef}
          ></textarea>
          <button onClick={handleAnswers} type="button">Add</button>
        </label>
        <label>
          <h4>Correct answer:</h4>
          <input 
          type="text"
          placeholder="Correct answer"
          name="correctAnswer"
          onChange={handleChange}
          />
        </label>
            <label>
              <h4>Category:</h4>
              <input
                type="text"
                placeholder="Category"
                name="category"
                onChange={handleChange}
              />
            </label>
            <label>
              <h4>Type:</h4>
              <input
                type="text"
                placeholder="Type"
                name="type"
                onChange={handleChange}
              />
            </label>
            <button onClick={handleAdding} type="submit" className="addQuestionButton">Add question</button>
          </div>
    </form>
  );
};

export default QuestionForm;
