import './App.css';
import {useState, useEffect} from 'react';
import Question from './components/Question'
import { nanoid } from 'nanoid';
import { Rings } from "svg-loaders-react";

function App() {

    const apiURL = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986";
    const [quizStatus, setQuizStatus] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [questionsSubmit, setQuestionsSubmit] = useState(false);
    const [q1Answer, setq1Answer] = useState("");
    const [q2Answer, setq2Answer] = useState("");
    const [q3Answer, setq3Answer] = useState("");
    const [q4Answer, setq4Answer] = useState("");
    const [q5Answer, setq5Answer] = useState("");

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

    function shuffle(array) {
        const tempArr = array;     
        for (let i = tempArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
        }
        return tempArr;
    }

    function transformData (data) {

        const newData = data.map(question => {

            const incorrect = question.incorrect_answers.map((answer)=>{
                return {
                    answerId: nanoid(),
                    answer: decodeURIComponent(answer), 
                    isCorrect: false
                }
            })
            const correct = {
                answerId: nanoid(),
                answer: decodeURIComponent(question.correct_answer), 
                isCorrect: true
            };
            setCorrectAnswers(prev=> [...prev, correct.answerId]);
            return {
                id: nanoid(), 
                question: decodeURIComponent(question.question), 
                answers: shuffle([...incorrect, correct])
            }

        })

        // console.log(newData);
        return newData;
    }

    function checkAnswersHandler () {
        
        // first check all answers have been selected
        // console.log(questions);
        // console.log(correctAnswers);
        console.log('answers', [
            q1Answer===correctAnswers[0], 
            q2Answer===correctAnswers[1],
            q3Answer===correctAnswers[2],
            q4Answer===correctAnswers[3],
            q5Answer===correctAnswers[4]
        ]);
        
        setQuestionsSubmit(true);
        // 
    }


    function checkResult(qid,aid) {
        const answers = questions[qid]
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

            
            <div className={quizStatus ? "screen screen-2" : "screen screen-2 screen__hidden"}>
                <section className="section">
                    <div className="questions">
                        {quizStatus && !apiSuccess && <Rings stroke="#293264" />}
                        { apiSuccess && <Question questionId={"q1"} data={questions[0]} answer={q1Answer} setAnswer={setq1Answer} /> }
                        { apiSuccess && <Question questionId={"q2"} data={questions[1]} answer={q2Answer} setAnswer={setq2Answer} /> }
                        { apiSuccess && <Question questionId={"q3"} data={questions[2]} answer={q3Answer} setAnswer={setq3Answer} /> }
                        { apiSuccess && <Question questionId={"q4"} data={questions[3]} answer={q4Answer} setAnswer={setq4Answer} /> }
                        { apiSuccess && <Question questionId={"q5"} data={questions[4]} answer={q5Answer} setAnswer={setq5Answer} /> }
                    </div>
                    <div className="results">
                        { apiSuccess && <button className="check-answers" onClick={checkAnswersHandler}>Check answers</button> }
                        { questionsSubmit && (
                                <>
                                    <span>You scored 1/5</span>
                                    <button>Play again</button>
                                </>
                            )
                            
                        }
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;
