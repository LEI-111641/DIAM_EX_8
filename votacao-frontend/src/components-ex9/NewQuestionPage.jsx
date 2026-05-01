import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";

function NewQuestionPage() {
    const [texto, setTexto] = useState("");
    const navigate = useNavigate();

    const enviarQuestao = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/votacao/api/questions/", {
            questao_texto: texto
        })
            .then(() => {
                alert("Questão criada com sucesso!");
                navigate("/"); // Volta para a lista inicial
            })
            .catch(err => console.error("Erro ao criar:", err));
    };

    return (
        <div className="container" style={{marginTop: "20px"}}>
            <h2>Nova Questão</h2>
            <Form onSubmit={enviarQuestao}>
                <FormGroup>
                    <Label for="texto">Texto da Pergunta:</Label>
                    <Input
                        type="text"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Ex: Qual a sua linguagem favorita?"
                        required
                    />
                </FormGroup>
                <Button color="primary" type="submit">Criar Questão</Button>
                <Button color="secondary" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>
                    Cancelar
                </Button>
            </Form>
        </div>
    );
}

export default NewQuestionPage;