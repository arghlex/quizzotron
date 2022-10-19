import './App.css';
import {useState, useEffect} from 'react';
import Question from './components/Question'
import { nanoid } from 'nanoid';

function App() {

    const apiURL = "https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple&encode=url3986";
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
        

    function getQuestions () {
        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                // console.log(data.results);
                setQuestions(transformData(data.results));
                setAnswers(
                    {
                        "q1": "",
                        "q2": "",
                        "q3": "",
                        "q4": ""
                    }
                );
            });
    }

    useEffect(()=>{
        getQuestions()
    }, [])


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

        console.log(newData);
        return newData;
    }

    function checkAnswersHandler () {
        console.log('check answers')

        // first check all answers have been selected

        // 
    }


    console.log("App render");

    const renderQuestions = questions.map( (item, index) => {
        return <Question key={item.id} questionId={"q" + ( index+1 )} data={item} answers={answers} setAnswers={setAnswers} />
    });

    return (
        <div className="App">
            <div className="intro">
                <h1>Quizzotron</h1>
                <p>Some description if needed</p>
                <button>Start Quiz</button>
            </div>

            <div className="questions">
                {renderQuestions}

                <button onClick={checkAnswersHandler}>Check answers</button>
            </div>
        </div>
    );
}

export default App;
