import './App.css';
import {useState, useEffect} from 'react';
import Questions from './components/Questions';
import { nanoid } from 'nanoid';
import { Rings } from "svg-loaders-react";
import ExampleData from './components/ExampleData';

function App () {

    ////////////////////////////////////////////////////////////////////////
    // Declare variables
    //

    const [data, setData] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState({q1: "", q2: "", q3: "", q4: "", q5: ""});
    const [userAnswers, setUserAnswers] = useState({q1: "", q2: "", q3: "", q4: "", q5: ""});
    const [gameInProgress, setGameInProgress] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [result, setResult] = useState("");

    ////////////////////////////////////////////////////////////////////////
    // Initial load data
    //

    useEffect(()=>{
        setData(transformData(ExampleData()));
    }, [])


    ////////////////////////////////////////////////////////////////////////
    // Functions
    //

    // Transforms original API data into a better format
    function transformData (data) {
        const newData = data.map((question,idx) => {
            
            const qId = `q${idx+1}`;
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
            
            setCorrectAnswers(prevObj => {
                return {
                    ...prevObj,
                    [qId]: correct.answerId 
                }
            });
            
            return {
                id: nanoid(), 
                question: decodeURIComponent(question.question), 
                answers: shuffle([...incorrect, correct])
            }
        })
        return newData;
    }

    // Shuffle function to move the correct answer around for presentation
    function shuffle(array) {
        const tempArr = array;     
        for (let i = tempArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tempArr[i], tempArr[j]] = [tempArr[j], tempArr[i]];
        }
        return tempArr;
    }

    // Get a count of correct answers
    function countOfCorrect () {
        let count = 0;

        for (const key in correctAnswers) {
            // console.log("for in", correctAnswers[key], userAnswers[key], correctAnswers[key] === userAnswers[key])
            if (correctAnswers[key]===userAnswers[key]) {
                count++
            }
        } 
        return count;
    }

    // Reset user answers for new game
    function prepareNewGame () {
        setUserAnswers({q1: "", q2: "", q3: "", q4: "", q5: ""});
        setGameInProgress(false);
        setGameOver(false);
        setResult("");
    }


    ////////////////////////////////////////////////////////////////////////
    // Event handlers
    //

    function handleNewGameClick (event) {
        setGameInProgress(true);
    }
    function handleCheckAnswersClick (event) {
        setResult(countOfCorrect());
        setGameInProgress(false);
        setGameOver(true);
    }
    function handleAnotherGameClick (event) {
        prepareNewGame();
    }


    ////////////////////////////////////////////////////////////////////////
    // Logging
    //

    // console.log("Correct answers", correctAnswers);
    // console.log("User answers", userAnswers);
    // console.log("Data", data);


    ////////////////////////////////////////////////////////////////////////
    // Render
    //

    return (
        <div className="App container" role="main">
            <svg className="svg svg--1" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#DEEBF8" d="M45,-70.6C58.6,-70.1,70.1,-58.6,70.7,-45C71.3,-31.4,61.1,-15.7,60.3,-0.4C59.5,14.8,68.3,29.6,65.1,38.8C61.9,48,46.8,51.5,34,56.9C21.2,62.2,10.6,69.4,-0.5,70.2C-11.6,71.1,-23.2,65.6,-37,60.9C-50.8,56.1,-66.8,51.9,-76.6,41.9C-86.5,31.9,-90.1,15.9,-88.8,0.8C-87.5,-14.4,-81.2,-28.8,-70.1,-36.6C-58.9,-44.4,-42.9,-45.5,-30.5,-46.7C-18,-47.9,-9,-49,3.4,-54.9C15.7,-60.7,31.4,-71.1,45,-70.6Z" transform="translate(100 100)" />
            </svg>
            <svg className="svg svg--2" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#fffad1" d="M45,-70.6C58.6,-70.1,70.1,-58.6,70.7,-45C71.3,-31.4,61.1,-15.7,60.3,-0.4C59.5,14.8,68.3,29.6,65.1,38.8C61.9,48,46.8,51.5,34,56.9C21.2,62.2,10.6,69.4,-0.5,70.2C-11.6,71.1,-23.2,65.6,-37,60.9C-50.8,56.1,-66.8,51.9,-76.6,41.9C-86.5,31.9,-90.1,15.9,-88.8,0.8C-87.5,-14.4,-81.2,-28.8,-70.1,-36.6C-58.9,-44.4,-42.9,-45.5,-30.5,-46.7C-18,-47.9,-9,-49,3.4,-54.9C15.7,-60.7,31.4,-71.1,45,-70.6Z" transform="translate(100 100)" />
            </svg>

            { 
                !gameInProgress && !gameOver &&
            
                <div className="section header">
                    <h1>Quizzotron</h1>
                    <button onClick={handleNewGameClick}>Play a new game</button>
                </div>
            }
            { 
                (gameInProgress || gameOver) &&
                <Questions 
                    data={data} 
                    userAnswers={userAnswers} 
                    setUserAnswers={setUserAnswers}
                    correctAnswers={correctAnswers}
                    isGameOver={gameOver}
                />
            }    

            <div className="section results">
                { gameInProgress && !gameOver && <button onClick={handleCheckAnswersClick}>Check answers</button> }
                { gameOver && 
                    <div>
                        <span className='results--outcome'>You scored {result}/5 correct answers</span>
                        <button onClick={handleAnotherGameClick}>Play again</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default App;
