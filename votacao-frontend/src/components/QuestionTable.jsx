import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import DetailModal from "./DetailModal";
import DeleteModal from "../components-ex9/DeleteModal.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function QuestionTable() {
    const navigate = useNavigate();
    const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";
    const [questionList, setQuestionList] = useState([]);

    const getQuestions = () => {
        axios.get(URL_QUESTIONS)
            .then((request) => {
                setQuestionList(request.data)
            });
    };

    useEffect(() => {
        getQuestions();
    }, []);

    const centered = {textAlign: "center"};

    return (
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
                    questionList.map((question) => (
                        <tr key={question.id}>
                            <td>{question.questao_texto}</td>
                            <td style={centered}>

                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    <DetailModal question={question}/>

                                    <Button
                                        color="success"
                                        onClick={() => navigate(`/votacao/${question.id}`)}
                                    >
                                        Votar
                                    </Button>

                                    <DeleteModal question={question}/>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
}

export default QuestionTable;