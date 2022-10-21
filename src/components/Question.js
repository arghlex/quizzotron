import React, { useEffect } from "react";

export default function Question (props) {

    const qid = props.questionId; 
    const question = decodeURIComponent(props.data.question);
    

    function clickHandler (event) {
        props.setAnswer(event.currentTarget.value)
    }

    const listItems = props.data.answers.map((item, idx) =>{
        return (
            <li key={`${qid}__a${idx + 1}`}>
                <input name={qid} type="radio" id={`${qid}__a${idx + 1}`} value={item.answerId} checked={props.answer === item.answerId} onChange={clickHandler} /> 
                <label htmlFor={`${qid}__a${idx + 1}`} role="button">
                    {decodeURIComponent(item.answer)}
                </label>
            </li>
        )
    });




    return (
        
        <div className="question">
            <h2>{question}</h2>
            <ol className="answers">
                {listItems}
            </ol>
        </div>
    )


}