import {useEffect, useState} from "react";
import {Button, Table} from "reactstrap";
import DetailModal from "./DetailModal";
import VoteModal from "./VoteModal";
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

                {/* Mantemos o teu botão de criar nova questão */}
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
                                    {/* Botão de Detalhe (que agora navega para página) */}
                                    <DetailModal question={question}/>
                                    &nbsp;

                                    {/* O teu botão de Votar (Página) */}
                                    <Button
                                        color="success"
                                        onClick={() => navigate(`/votacao/${question.id}`)}
                                    >
                                        Votar (Pág)
                                    </Button>
                                    &nbsp;

                                    {/* O Votar do Figueira (Modal) - Opcional manter ambos para testar */}
                                    <VoteModal question={question}/>
                                    &nbsp;

                                    {/* O Apagar do Figueira */}
                                    <DeleteModal question={question} />
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