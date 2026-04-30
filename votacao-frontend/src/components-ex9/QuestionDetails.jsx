import axios from "axios";
import {useEffect, useState} from "react";
import {useParams, useLocation} from "react-router-dom";
import DetailData from "../components/DetailData.jsx";

function QuestionDetails() {
    const { id } = useParams();
    const location = useLocation();

    const question = location.state?.question;

    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        axios.get(URL_OPTIONS + id)
            .then(res => setOptionList(res.data));
    }, [id]);

    if (!question) return <p>Sem dados da pergunta (refresh da página?)</p>;

    return (
        <div>
            <DetailData
                options={optionList}
                question={question}
            />
        </div>
    );
}

export default QuestionDetails;