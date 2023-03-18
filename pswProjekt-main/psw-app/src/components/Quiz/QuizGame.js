import React from "react";
// import QuestionForm from "./QuestionForm";
// import QuestionList from "./QuestionList";
import QuestionAllList from "./QuestionAllList";

const QuizGame = () => {

  //   // var response = fetch("http://localhost:3000/question/add", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     "Access-Control-Allow-Origin": "*",
  //   //     "Access-Control-Allow-Methods": "*",
  //   //     "Access-Control-Allow-Headers": "*"
  //   //   },
  //   //   body: JSON.stringify({
  //   //     question: question.text,
  //   //     type: "TEXT",
  //   //     answerArray: question.answers,
  //   //     wasAnswered : false,
  //   //     correctAnswerArray : ["YES"]
  //   //   }),
  //   // }).then(response => response.json())

return (
    <>
      <h1>Lista wszystkich pytań:</h1>
      <QuestionAllList></QuestionAllList>
    </>
  );
};

export default QuizGame;
