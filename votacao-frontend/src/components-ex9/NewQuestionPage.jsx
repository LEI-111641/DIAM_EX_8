import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label, Row, Col} from "reactstrap";
import axios from "axios";

function NewQuestionPage() {
    const [texto, setTexto] = useState("");
    // Começamos com duas opções vazias por defeito
    const [opcoes, setOpcoes] = useState(["", ""]);
    const navigate = useNavigate();

    const handleOpcaoChange = (index, value) => {
        const novasOpcoes = [...opcoes];
        novasOpcoes[index] = value;
        setOpcoes(novasOpcoes);
    };

    const adicionarCampoOpcao = () => {
        setOpcoes([...opcoes, ""]);
    };

    const removerCampoOpcao = (index) => {
        if (opcoes.length > 2) {
            const novasOpcoes = opcoes.filter((_, i) => i !== index);
            setOpcoes(novasOpcoes);
        }
    };

    const enviarQuestao = (e) => {
        e.preventDefault();

        // 1. Criar a Questão
        axios.post("http://localhost:8000/votacao/api/questions/", {
            questao_texto: texto
        })
            .then((res) => {

                const questionId = res.data.id;

                // 2. Criar as Opções associadas a esse ID
                const promises = opcoes
                    .filter(opt => opt.trim() !== "") // Ignora opções vazias
                    .map(optTexto => {
                        return axios.post(`http://localhost:8000/votacao/api/options/${questionId}`, {
                            questao: questionId,
                            opcao_texto: optTexto,
                            votos: 0
                        });
                    });

                return Promise.all(promises);
            })
            .then(() => {
                alert("Questão e opções criadas com sucesso!");
                navigate("/");
            })
            .catch(err => {
                console.error("Erro ao criar:", err);
                alert("Erro ao criar a questão. Verifica se o servidor devolve o ID da questão.");
            });
    };

    return (
        <div className="container" style={{marginTop: "20px"}}>
            <h2>Nova Questão</h2>
            <hr/>
            <Form onSubmit={enviarQuestao}>
                <FormGroup>
                    <Label className="fw-bold">Texto da Pergunta:</Label>
                    <Input
                        type="text"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                        placeholder="Ex: Qual a sua linguagem favorita?"
                        required
                    />
                </FormGroup>

                <h4 className="mt-4">Opções de Resposta</h4>
                {opcoes.map((opcao, index) => (
                    <Row key={index} className="mb-2 align-items-center">
                        <Col>
                            <Input
                                type="text"
                                value={opcao}
                                onChange={(e) => handleOpcaoChange(index, e.target.value)}
                                placeholder={`Opção ${index + 1}`}
                                required
                            />
                        </Col>
                        {opcoes.length > 2 && (
                            <Col xs="auto">
                                <Button color="danger" outline onClick={() => removerCampoOpcao(index)}>
                                    Remover
                                </Button>
                            </Col>
                        )}
                    </Row>
                ))}

                <Button color="info" outline size="sm" onClick={adicionarCampoOpcao} className="mb-4">
                    + Adicionar Opção
                </Button>

                <hr/>
                <div className="mt-3">
                    <Button color="primary" type="submit">Guardar Tudo</Button>
                    <Button color="secondary" onClick={() => navigate("/")} style={{marginLeft: "10px"}}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default NewQuestionPage;