import React, { useMemo } from "react";
import "./style1.css"
import { useNavigate } from "react-router-dom";

const GameQuiz = () => {
  const navigate = useNavigate();
  var nick = "";

  const update = useMemo(() => {
    return () => {
      nick = document.getElementById("nick").value;
      
      // create user
      var response = fetch("http://localhost:3000/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
          login:nick,
          password: "password"
        }),
      }).then(response)
  
      localStorage.setItem("login", nick)
  
      // reset questions
      // var response = fetch("http://localhost:3000/question/reset", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "*",
      //     "Access-Control-Allow-Headers": "*"
      //   },
      //   body: JSON.stringify({
      //   }),
      // }).then(response)
      navigate("/user-panel/gamequestion");
      console.log(nick)
    }
  }, []);

  return (
    <div class="mainWindowGame">
    <div class="gameWindow">
      <h1>Let's start the game!</h1>
      <br>
      </br>
      <form onSubmit={update}>
      <label>
          Enter your username: <br></br><br></br>
          <input
              id="nick"
              type="text"
              name="text"
              placeholder="username"
              minLength="4"
              required
          />
        </label>
      <button class="startingButton">Start</button>
      </form>
    </div>
    </div>
  );;
};

export default GameQuiz;
