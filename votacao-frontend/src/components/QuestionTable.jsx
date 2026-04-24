import React, {useEffect, useState} from "react";
import {Table} from "reactstrap";
import DetailModal from "./DetailModal";
import VoteModal from "./VoteModal";
import axios from "axios";

function QuestionTable() {
    const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
    const [questionList, setQuestionList] = useState([]); // (2)
    const getQuestions = () => { // (3)
        axios.get(URL_QUESTIONS)
            .then((request) => {
                setQuestionList(request.data)
            });
    };
    useEffect(() => { // (4)
        getQuestions();
    }, []);
    const centered = {textAlign: "center"};
    return ( // (5)
        <Table light="true">
            <thead>
            <tr>
                <th>Texto</th>
                <th style={centered}>Controls</th>
            </tr>
            </thead>
            <tbody>
            {
                questionList.map((question) => ( // (6)
                        <tr key={question.id}>
                            <td>{question.questao_texto}</td>
                            <td style={centered}>
                                <DetailModal question={question}/>
                                &nbsp;
                                <VoteModal question={question}/>
                            </td>
                        </tr>
                    )
                )}
            </tbody>
        </Table>
    );
}

export default QuestionTable;