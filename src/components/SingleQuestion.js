import React from "react";

export default function SingleQuestion (props) {

    const questionID = props.questionID;
    const questionNumber = props.questionNumber;


    function handleRadioChange (event) {
        if (!props.isGameOver) {
            props.setUserAnswers(prevObj => {
                return {
                    ...prevObj,
                    [`q${questionNumber+1}`]: event.target.value
                }
            })
        }
    }

    const listItems = props.allAnswers.map((answerData,idx) => {

        const questionKey = `question-${questionID}__answer-${idx}`;
        const questionName = `question-${questionID}`;
        const isCorrect = props.correctAnswers[`q${questionNumber+1}`] === answerData.answerId;
        const isSelected = props.userAnswers[`q${questionNumber+1}`] === answerData.answerId;
        let classes = "";

        // Answer selection
        if (isSelected) {
            classes += " selected ";
        }

        // Game is over
        if (props.isGameOver) {
            if (isCorrect) {
                classes += " correct ";    
            } else {
                classes += " inactive ";
                if (isSelected) {
                    classes += " incorrect ";
                }
            }
        }


        return (
                <li key={questionKey}>
                <input 
                    name={questionName} 
                    type="radio" 
                    id={questionKey} 
                    value={answerData.answerId} 
                    checked={isSelected} 
                    onChange={handleRadioChange} 
                /> 
                
                <label 
                    htmlFor={questionKey} 
                    role="button" 
                    className={classes}
                >
                        {answerData.answer}
                </label>
            </li>
        )
    });
    

    return (       
        <div className="question">
            <h2>{props.question}</h2>
            <ol className="answers">
                {listItems}
            </ol>
        </div>
    )


}