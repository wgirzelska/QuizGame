import React from "react"

const GameRules = () => {
    return(
        <div>
            <h1>Welcome to Knowledge Kingdom!</h1>
            <h1>Game rules:</h1>
            <div class="rulesDiv">
              <dl>
                <dt>Questions</dt>
                <dd>The quiz has different types of questions</dd>
                <dt>Points</dt>
                <dd>For the correct answer you get a point and for the wrong answer you loose one</dd>
              </dl>
              <dl>
                <dt>Time</dt>
                <dd>There is limited time for questions</dd>
                <dt>Order</dt>
                <dd>You can't go back to the previous questions</dd>
              </dl>
            </div>
        </div>
    )
}

export default GameRules;
