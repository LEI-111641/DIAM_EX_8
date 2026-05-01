import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import DetailModal from "./DetailModal";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function QuestionTable() {
    const navigate = useNavigate();
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
        <div className="container" style={{marginTop: "20px"}}>
            <div className="d-flex justify-content-between align-items-center">
                <h2>Lista de Questões</h2>

                <Button
                    color="primary"
                    onClick={() => navigate("/nova-questao")}
                >
                    + Criar Nova Questão
                </Button>
            </div>
            <hr/>
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
                                    <Button
                                        color="success"
                                        onClick={() => navigate(`/votacao/${question.id}`)}
                                    >
                                        Votar
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default QuestionTable;