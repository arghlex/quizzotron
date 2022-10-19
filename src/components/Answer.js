import React from 'react';

export default function Answer (props) {

    const qid = props.qid;
    const answer = props.answer;
    const isCorrect = props.isCorrect;


    return (

        <label htmlFor={`${qid}__a1`}>
            <input name={qid} type="radio" id={`${qid}__a1`} /> 
            {answer}
        </label>

    )


}