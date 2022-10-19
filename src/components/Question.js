import React from "react";

export default function Question (props) {

    const qid = props.questionId; 
    const question = decodeURIComponent(props.data.question);
    // const answers = props.data.map(item=>{
    //     console.log(item);
    // });


    function clickHandler (event) {
        console.log(event.target.value);
        props.setAnswers( (prev) => {

            prev[qid] = event.target.value;
            return prev;
        })

        console.log(props.answers);
    }


    return (
        
        <div className="question">
            <h2>{question}</h2>
            <ol>
                <li>
                    <input name={qid} type="radio" id={`${qid}__a1`} value="1" checked={props.answers[qid] === "1"} onChange={clickHandler} /> 
                    <label htmlFor={`${qid}__a1`}>
                        {decodeURIComponent(props.data.answers[0].answer)}
                    </label>
                </li>
                <li>
                    <input name={qid} type="radio" id={`${qid}__a2`} value="2" checked={props.answers[qid] === "2"} onChange={clickHandler} /> 
                    <label htmlFor={`${qid}__a2`}>
                        {decodeURIComponent(props.data.answers[1].answer)}
                    </label>
                </li>

                <li>
                    <input name={qid} type="radio" id={`${qid}__a3`} value="3" checked={props.answers[qid] === "3"} onChange={clickHandler} /> 
                    <label htmlFor={`${qid}__a3`}>
                        {decodeURIComponent(props.data.answers[2].answer)}
                    </label>
                </li>

                <li>
                    <input name={qid} type="radio" id={`${qid}__a4`} value="4" checked={props.answers[qid] === "4"} onChange={clickHandler} /> 
                    <label htmlFor={`${qid}__a4`}>
                        {decodeURIComponent(props.data.answers[3].answer)}
                    </label>
                </li>
            </ol>
        </div>
    )


}