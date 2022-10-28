import { nanoid } from "nanoid";
import React from "react";
import SingleQuestion from './SingleQuestion';

export default function Questions (props) {


    // Generate questions via map


    const questions = props.data.map((questionData, questionNumber) => {

        const qAllAnswers = questionData.answers; // array
        const qId = questionData.id; // specific question id
        const qSentence = questionData.question; // actual question sentence
        

        return (
            <SingleQuestion 
                key={nanoid()} 
                questionID={qId}
                questionNumber={questionNumber} 
                question={qSentence} 
                allAnswers={qAllAnswers}
                userAnswers={props.userAnswers}
                correctAnswers={props.correctAnswers}
                setUserAnswers={props.setUserAnswers}
                isGameOver={props.isGameOver}

            />
        )

    });



    return (
        <div className="section questions">
            {questions}
        </div>
    )
}