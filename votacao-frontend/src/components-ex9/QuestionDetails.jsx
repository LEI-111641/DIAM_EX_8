import axios from "axios";
import {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom"; // Adicionei useNavigate
import DetailData from "../components/DetailData.jsx";

function QuestionDetails() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const question = location.state?.question;

    const URL_OPTIONS = `http://localhost:8000/votacao/api/options/${id}`;
    const URL_COMMENTS = `http://localhost:8000/votacao/api/comments/${id}`;

    const [optionList, setOptionList] = useState([]);
    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        // Carrega Opções
        axios.get(URL_OPTIONS)
            .then(res => setOptionList(res.data))
            .catch(err => console.error("Erro opções:", err));

        // Carrega Comentários
        axios.get(URL_COMMENTS)
            .then(res => setCommentList(res.data))
            .catch(err => console.error("Erro comentários:", err));
    }, [id]);

    if (!question) return <p>Sem dados da pergunta (refresh da página?)</p>;

    return (
        <div>
            <DetailData
                options={optionList}
                comments={commentList}
                question={question}
                toggle={() => navigate("/")}
            />
        </div>
    );
}

export default QuestionDetails;