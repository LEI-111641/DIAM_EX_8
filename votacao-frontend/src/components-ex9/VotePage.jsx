import {useEffect, useState} from "react";
import {Button} from "reactstrap";
import axios from "axios";
import VoteForm from "../components/VoteForm";
import {useNavigate, useParams} from "react-router-dom";

function VotePage() {
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
    const {id} = useParams();
    const navigate = useNavigate();
    const [optionList, setOptionList] = useState([]);

    useEffect(() => {
        axios.get(URL_OPTIONS + id)
            .then(request => {
                setOptionList(request.data);
            })
            .catch(err => console.error("Erro ao carregar opções:", err));
    }, [id, URL_OPTIONS]);

    const voltar = () => navigate("/");

    return (
        <>
            <div className="container" style={{marginTop: "20px"}}>
                <h2>Voto na questão {id}</h2>
                <hr/>

                <VoteForm
                    options={optionList}
                    question={{id: id}}
                    toggle={voltar}
                />

                <Button onClick={voltar} color="secondary" style={{marginTop: "10px"}}>
                    Cancelar e Voltar
                </Button>
            </div>
        </>
    );
}

export default VotePage;