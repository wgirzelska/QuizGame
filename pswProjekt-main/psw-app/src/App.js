import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import WorkerPanel from "./components/UserPanel/UserPanel";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import QuizGame from "./components/Quiz/QuizGame";
import GameQuiz from "./components/Quiz/GameQuiz"
import UserRanking from "./components/UserPanel/UserRanking"
import GameRules from "./components/UserPanel/GameRules"
import { UserLoginContext } from "./components/LoginContext/LoginContext";
import { Button, Result } from "antd";
import "./App.css";
import Categories from "./components/Quiz/Categories.js";
import QuestionForm from "./components/Quiz/QuestionForm.js";

const App = () => {
  const [authenticated, isAuthenticated] = useState(false);
  const [admin, isAdmin] = useState(false);

  return (
    <>
      <UserLoginContext.Provider
        value={{ authenticated, isAuthenticated, admin, isAdmin }}
      >
        {admin === false ? (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/user-panel"
                element={authenticated ? <WorkerPanel /> : <Navigate to="/" />}
              >
                
                <Route path="rules" element={<GameRules />} />
                <Route path="game" element={<GameQuiz />} />
                <Route path="ranking" element={<UserRanking />} />
                <Route path="gamequestion" element={<Categories />} />
              </Route>
              <Route
                path="game"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        type="primary"
                        onClick={() => (window.location = "/")}
                      >
                        Back
                      </Button>
                    }
                  />
                }
              />
            </Routes>
          </Router>
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/user-panel-admin"
                element={authenticated ? <AdminPanel /> : <Navigate to="/" />}
              >
                <Route path="quiz" element={<QuizGame />} />
                <Route path="add-questions" element={<QuestionForm />} />
              </Route>
              <Route
                path="*"
                element={
                  <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={
                      <Button
                        type="primary"
                        onClick={() => (window.location = "/")}
                      >
                        Back Home
                      </Button>
                    }
                  />
                }
              />
            </Routes>
          </Router>
        )}
      </UserLoginContext.Provider>
    </>
  );
};

export default App;
