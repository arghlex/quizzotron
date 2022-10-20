import './App.css';
import {useState, useEffect} from 'react';
import Question from './components/Question'
import { nanoid } from 'nanoid';

function App() {

    const apiURL = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986";
    const [quizStatus, setQuizStatus] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [q1Answer, setq1Answer] = useState("");
    const [q2Answer, setq2Answer] = useState("");
    const [q3Answer, setq3Answer] = useState("");
    const [q4Answer, setq4Answer] = useState("");
        

    function getQuestions () {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data.results);
                setQuestions(transformData(data.results));
                setApiSuccess(true);
            });
    }

    function handleStartButton(e) {
        // Set quiz state to started
        setQuizStatus(true);

        // Do API request
        if (!apiSuccess) {
            getQuestions();
        }
    }

    function transformData (data) {

        const newData = data.map(question => {

            const incorrect = question.incorrect_answers.map((answer)=>{
                return {
                    answer: answer, 
                    isCorrect: false
                }
            })
            const correct = {
                answer: question.correct_answer, 
                isCorrect: true
            };

            return {
                id: nanoid(), 
                question: question.question, 
                answers: [...incorrect, correct]
            }

        })

        // console.log(newData);
        return newData;
    }

    function checkAnswersHandler () {
        console.log('check answers', q1Answer, q2Answer,q3Answer,q4Answer)
        // first check all answers have been selected

        // 
    }


    console.log("App render");

    // const renderQuestions = questions.map( (item, index) => {
    //     return <Question key={item.id} questionId={"q" + ( index+1 )} data={item} answers={answers} setAnswer={setAnswers} />
    // });

    return (
        <div className="App">
            <div className={quizStatus ? "intro screen screen-1 screen__hidden" : "intro screen screen-1"}>
                <h1>Quizzotron</h1>
                <p>Some description if needed</p>
                <button onClick={handleStartButton}>Start Quiz</button>
            </div>

            <div className={quizStatus ? "questions screen screen-2" : "questions screen screen-2 screen__hidden"}>

                { apiSuccess && <Question questionId={"q1"} data={questions[0]} answer={q1Answer} setAnswer={setq1Answer} /> }
                { apiSuccess && <Question questionId={"q2"} data={questions[1]} answer={q2Answer} setAnswer={setq2Answer} /> }
                { apiSuccess && <Question questionId={"q3"} data={questions[2]} answer={q3Answer} setAnswer={setq3Answer} /> }
                { apiSuccess && <Question questionId={"q4"} data={questions[3]} answer={q4Answer} setAnswer={setq4Answer} /> }

                { apiSuccess && <button onClick={checkAnswersHandler}>Check answers</button> }
            </div>
        </div>
    );
}

export default App;
