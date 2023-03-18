// app data
var express = require('express');
var cors = require('cors');
var path = require('path');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser')
var neo4j = require('neo4j-driver');
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
var cookieParser = require('cookie-parser');
app.use(cookieParser());
 
// logger
const { Console } = require("console");
const fs = require("fs");
const myLogger = new Console({
    stdout: fs.createWriteStream("normalStdout.txt"),
    stderr: fs.createWriteStream("errStdErr.txt"),
  });
 
// crypto
var crypto = require('crypto');
var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
var key = 'password';
 
// mqtt
app.use(logger('dev'));
app.unsubscribe(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors());
 
// neo database
var driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j','tomi1003'))
var session = driver.session();

const UserRole = Object.freeze({"admin":1, "user":2})

// websocket comments
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });

wss.on('connection', function connection(ws) {
  console.log('A new client Connected!');
  ws.send('Welcome New Client!');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
  ws.on('error', function (error) {
    console.log('Client Disconnected');
    });
});

 
// admin data
var adminLogin = 'admin'
var adminPassword = '0390a23613727a918e3f305b4bae0159'
var adminToken = 'fgsdg3244523kjlnv23445230'
 
// user data
var userLogin = 'user'
var userPassword = '0390a23613727a918e3f305b4bae0159'
var userToken = 'fgsdg311244523kjlnv23445230'
 
// crypto
function checkPasword(password, encryptedPassword) {
    var cipher = crypto.createCipher(algorithm, key);  
    var decipher = crypto.createDecipher(algorithm, key);
    var encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');
    console.log(encrypted)
    if(encrypted === encryptedPassword){
        var decrypted = decipher.update(encryptedPassword, 'hex', 'utf8') + decipher.final('utf8');
        if(decrypted === password){
            return true;
        }
    }
    return false;
  }
 
app.use(bodyParser.json())

app.get('/', (req, res) => {

    console.log("Client connected")
    startTime = new Date()
    startTimeString = startTime.toLocaleString()
    console.log('Connection opened at', startTimeString)

    res.on('close', () => {
        console.log('Client disconnected')
        const duration = (new Date() - startTime) / 1000
        console.log("Client closed connection after " + duration + " seconds")
        res.end()
    })
})
 
app.get('/questions',function(req, res){
    session
        .run('MATCH (n:Question) RETURN n LIMIT 40')
        .then(function(result){
            var movieArr = [];
            result.records.forEach(function(record) {
                movieArr.push({
                    question: record._fields[0].properties.question,
                    correctAnswerArray: record._fields[0].properties.correctAnswerArray,
                    answerArray: record._fields[0].properties.answerArray,
                    type: record._fields[0].properties.type,
                    wasAnswered: record._fields[0].properties.wasAnswered
                });
            });
            myLogger.log("QUESTION LIST");
            res.send(movieArr)
            
        })
        .catch(function(err){
            console.log(err);
            
        });
});

app.get('/users/get',function(req, res){
    session
        .run('MATCH (n:User) RETURN n')
        .then(function(result){
            var movieArr = [];
            result.records.forEach(function(record) {
                movieArr.push({
                    login: record._fields[0].properties.login,
                    password: record._fields[0].properties.password,
                    points: record._fields[0].properties.points,
                });
            });
            myLogger.log("USERS LIST");
            res.send(movieArr)
            
        })
        .catch(function(err){
            console.log(err);
            
        });
});

app.get('/questions/next',function(req, res){
    session
        .run('MATCH (n:Question) WHERE n.wasAnswered=false RETURN n ORDER BY rand() LIMIT 1')
        .then(function(result){
            
            var movieArr = [];
            result.records.forEach(function(record) {
                movieArr.push({
                    question: record._fields[0].properties.question,
                    answerArray: record._fields[0].properties.answerArray,
                });
            });
            
            myLogger.log("NEXT QUESTION");
            res.send(movieArr)
            
        })
        .catch(function(err){
            console.log(err);
            
        });
  
});
 
app.get('/questions/:pattern',function(req, res){
    session
        .run('MATCH (n:Question) where n.question CONTAINS $questionParam  RETURN n LIMIT 35', {questionParam: req.params.pattern})
        .then(function(result){
            var movieArr = [];
            result.records.forEach(function(record) {
                movieArr.push({
                    question: record._fields[0].properties.question,
                    correctAnswerArray: record._fields[0].properties.correctAnswerArray,
                    answerArray: record._fields[0].properties.answerArray,
                    type: record._fields[0].properties.type,
                    wasAnswered: record._fields[0].properties.wasAnswered
                });
            });
            myLogger.log("SEARCH PATTERN:" +  req.params.pattern );
            res.send(movieArr)
        })
        .catch(function(err){
            console.log(err);
        });
});

// app.get('/answers/:pattern',function(req, res){
//     session
//         .run('MATCH (n:Answer  {login:$questionParam})  RETURN n', {questionParam: req.params.pattern})
//         .then(function(result){
//             var movieArr = [];
//             result.records.forEach(function(record) {
//                 movieArr.push({
//                     question: record._fields[0].properties.question,
//                     answer: record._fields[0].properties.answer,
//                     login: record._fields[0].properties.login,
//                 });
//             });
//             myLogger.log("GET ALL USER ANSWERS" + req.params.pattern)
//             res.send(movieArr)
//         })
//         .catch(function(err){
//             console.log(err);
//         });
// });

app.get('/ranking/:user',function(req, res){
    session
        .run('MATCH (n:Answer  {login:$questionParam})  RETURN n', {questionParam: req.params.user})
        .then(function(result){
            var movieArr = [];
            result.records.forEach(function(record) {
                movieArr.push({
                    question: record._fields[0].properties.question,
                    answer: record._fields[0].properties.answer,
                    login: record._fields[0].properties.login,
                });
            });
            myLogger.log("GET ALL USER ANSWERS" + req.params.pattern)
            res.send(movieArr)
        })
        .catch(function(err){
            console.log(err);
        });
});
 
app.delete('/question/delete', function(req,res){
    console.log(req.body)
    var question = req.body.question;
    session
        .run('MATCH (n:Question {question:$questionParam}) DELETE n', {questionParam: question})
        .then(
            res.send('DELETED'))
        .catch(function(err){
            console.log(err);
        });
    myLogger.log('QUESTION DELETED:' + question)
})

app.delete('/questions/delete', function(req,res){
    console.log(req.body)
    var question = req.body.question;
    session
        .run('MATCH (n:Question) detach DELETE  n', {questionParam: question})
        .then(
            res.send('DELETED'))
        .catch(function(err){
            console.log(err);
        });
    myLogger.log('QUESTIONS DELETED:' + question)
})

// sredni wynik uzytkownikow
// app.get('/questions/mean', async (req, res) => {
//   try {
//     const result = await session.run(
//       `CALL apoc.agg.mean(
//         'MATCH (u:User) RETURN u.points AS points', 
//         {points: apoc.convert.toFloat(points)}
//       ) AS mean`
//     );
//     console.log(result)
//     const mean = result.records[0].get('mean');

//     res.status(200).json({ mean });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   } finally {
//     await session.close();
//   }
// });

app.delete('/answer/delete', function(req,res){
    session
        .run('MATCH (n:Answer) DETACH DELETE n')
        .then(
            res.send('DELETED'))
        .catch(function(err){
            console.log(err);
        });
    myLogger.log('Answers DELETED:')
})

app.delete('/user/delete', function(req,res){
    session
        .run('MATCH (n:User) DETACH DELETE n')
        .then(
            res.send('DELETED'))
        .catch(function(err){
            console.log(err);
        });
    myLogger.log('Users DELETED:')
})

app.put('/question/update', function(req,res){
    var question = req.body.question;
    var newQuestion = req.body.newQuestion;
    session
        .run('MATCH (n:Question {question:$questionParam})' + 
        'SET n += {question : $newQuestionParam} return n', {questionParam: question, newQuestionParam: newQuestion})
        .then(function(result){
            res.send('UPDATED');
        })
        .catch(function(err){
            console.log(err);
        });
})

app.post('/question/add', function(req,res){
    console.log(req.body) 
    var question = req.body.question;
    var type = req.body.type;
    var wasAnswered = req.body.wasAnswered;
    const correctAnswerArray = req.body.correctAnswerArray;
    const answerArray = req.body.answerArray;
    const category = req.body.category;
 
    session
        .run('CREATE(n:Question {question:$questionParam,correctAnswerArray:$correctAnswerArrayParam,'+
        'answerArray:$answerArrayParam,type:$typeParam, category:$categoryParam, wasAnswered:false}) RETURN n.question', 
        {questionParam:question, correctAnswerArrayParam:correctAnswerArray, answerArrayParam:answerArray, typeParam:type, categoryParam:category})
        .then(
            res.send('QUESTION ADDED'))
        .catch(function(err){
            console.log(err);
        });
    myLogger.log('ADD QUESTION')
    myLogger.log('Question: ' + question + ' Correct Answer: ' + correctAnswerArray)
    myLogger.log('Answer: ' + answerArray)
})

app.post('/user/add', function(req,res){
    var login = req.body.login;
    var password = req.body.password;
    var points = 0;

    var userCount = parseInt(req.cookies.userCount) || 0;
    userCount += 1
    res.cookie("userCount", userCount, { maxAge: 24 * 60 * 60 * 1000 });
    res.send("Liczba uzytkowników w ciągu ostatniej doby: " + userCount);

    session
        .run('CREATE(n:User {login:$loginParam,password:$passwordParam,points:$pointsParam}) RETURN n.question', 
        {loginParam:login, passwordParam:password,pointsParam:points})
        .then(
            res.send('USER ADDED'))
        .catch(function(err){
            console.log(err);
        });
    
})

// app.get('/question/:index', (req, res) => {
//     session
//       .run(
//         `MATCH (q:Question)
//         WHERE q.index = ${req.params.index}
//         RETURN q.question as question, q.`
//       )
//       .then((result) => {
//         session.close();
//         res.json({
//           question: result.records[0].get('question'),
//           answers: result.records[0].get('answers'),
//         });
//       })
//       .catch((error) => {
//         session.close();
//         res.status(500).json({ error });
//       });
//   });

app.post('/question/reset', function(req,res){
    session
    .run('MATCH (n:Question)' + 
    'SET n += {wasAnswered : false} return n')
    .then(
        res.send('QUESTION RESTARTED'))
        myLogger.log("RESETED QUESTIONS")
    .catch(function(err){
        console.log(err);
    });

})

async function getResult(){
    console.log('HERE I AM')
    return;
}

app.post('/answer/add', async function(req,res){
    await getResult();
    var answer = req.body.answer;
    var question = req.body.question;
    var login = req.body.login;
    var correct = true;

    const session1 = driver.session();
    const session2 = driver.session();
    const session3 = driver.session();
    const session4 = driver.session();
    const session5 = driver.session();

    // update question
    await session1
        .run('MATCH (n:Question {question:$questionParam}) SET n += {wasAnswered : true} return n', {questionParam: question})
        .then(async function(result){
        myLogger.log('Question was answered')
    })
    .catch(function(err){
        console.log(err);
    });
    session1.close();

     // check if answer is correct
    await session2
    .run('MATCH (n:Question {question:$questionParam}) RETURN n LIMIT 1',
    {questionParam: question})
    .then(async function(result){
        result.records.forEach(function(record) {
                correctAnswerArray = record._fields[0].properties.correctAnswerArray
        });
    myLogger.log("QUESTION LIST");
    if(JSON.stringify(correctAnswerArray[0]) === JSON.stringify(answer))
    {
        console.log('ok')
        correct = true;
    }
    else{
        console.log('not ok')
        correct = false;
    }
    })
    .catch(async function(err){
        console.log(err);   
    }); 
    session2.close();

    console.log('result')
    console.log(correct)

    // add points
    var points =0;
    if(correct === true){
        console.log('POINT IS ADDED')
        await session5
        .run('MATCH (n:User {login:$loginParam}) set n.points = n.points +1   RETURN n ', {loginParam: login})
        .then(async function(result){
        myLogger.log('Point was added')
        })
        .catch(function(err){
        console.log(err);
        });
        session5.close();
    }
    
    // add answer
    await session3
    .run('CREATE(n:Answer {answer:$answerParam,question:$questionParam,login:$loginParam, correct:$correctParam}) RETURN n.name', 
        {answerParam: answer, questionParam: question, loginParam: login, correctParam: correct})
    .then(async function(result){
        myLogger.log('Answer was created')})
        .catch(function(err){
    console.log(err);
    });
    session3.close();
    var correctAnswerArray;


    // add answer to question
    await session4
    .run('MATCH(a:Answer {question:$questionParam}),(b:Question{question:$questionParam}) MERGE(a)-[r:ACTED_IN]-(b) RETURN a,b' , {questionParam: question})
    .then(function(result){
        // res.redirect('/');
        myLogger.log('Answer was added to question')
    })
    .catch(function(err){
        console.log(err);
    });
    session4.close();

    if(correct){
        res.send('GOOD ANSWER')
    }
    else{
        res.send('BAD ANSWER')
    }

})

// logowanie
app.post('/login', function(req,res){
    var login = req.body.login;
    var password = req.body.password;
    var userRole = req.body.userRole;

    if(login === 'user' && checkPasword(password,userPassword) && userRole === UserRole.user.valueOf()){
        res.send(userToken);
        
    }
    else if(login === 'admin' && checkPasword(password,adminPassword) && userRole === UserRole.admin.valueOf()){
        res.send(adminToken);
    }
    else{
        res.send('Incorrect password')
    }
})

app.listen(3000);
var express = require('express');
var bodyParser = require('body-parser');
const e = require('express');
app.use(express.json());
console.log('Server Started on Port 3000');
module.exports = app;