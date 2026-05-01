import {useState} from "react";
import {Button, Form, FormGroup, Table, Label, Input} from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({options, question, toggle}) {
    const URL_OPTION = "http://localhost:8000/votacao/api/option/"; // (1)

    const URL_COMMENTS = "http://localhost:8000/votacao/api/comments/";
    const [selectedOption, setSelectedOption] = useState(-1); // (2)
    const [autor, setAutor] = useState("");
    const [texto, setTexto] = useState("");
    const voteAndCloseModal = (event) => {
        event.preventDefault();
        if (selectedOption >= 0) {
            const promises = [];
            const option = {...options[selectedOption]};
            option.votos++;

            promises.push(axios.put(URL_OPTION + option.id, option));

            if (autor.trim() !== "" && texto.trim() !== "") {
                promises.push(axios.post(URL_COMMENTS + question.id, {
                    autor: autor,
                    texto: texto
                }));
            }

            Promise.all(promises).then(() => {
                alert("Voto registado com sucesso!");

                toggle();
            }).catch(err => {
                console.error(err);
                alert("Ocorreu um erro ao processar o seu pedido.");
            });
            return;
        }
        toggle();
    }

    const optionChangeHandler = (event) => { // (4)
        const optionId = parseInt(event.target.value);
        setSelectedOption(optionId);
    }
    return (
        <>
            <Form onSubmit={voteAndCloseModal}> {/* (5) */}
                <FormGroup>
                    <b>Texto:</b><p>{question.questao_texto}</p>
                    <b>Data de publicação:</b>
                    <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
                </FormGroup>
                <FormGroup>
                    <Table>
                        <thead>
                        <tr>
                            <th align="left">Opção</th>
                        </tr>
                        </thead>
                        <tbody>
                        {options.map((o, index) => // (6)
                            <tr key={o.id}>
                                <td align="left">
                                    <FormGroup check>
                                        <Label>
                                            <input type="radio" name="react-radio"
                                                   checked={selectedOption === index}
                                                   value={index}
                                                   className="form-check-input"
                                                   onChange={optionChangeHandler}
                                            />
                                            {o.opcao_texto}
                                        </Label>
                                    </FormGroup>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </FormGroup>
                <FormGroup>
                    <b>Autor do comentário:</b>
                    <Input type="text" value={autor} onChange={(e) => setAutor(e.target.value)}
                           placeholder="O seu nome"/>
                </FormGroup>
                <FormGroup>
                    <b>Comentário (opcional):</b>
                    <Input type="textarea" value={texto} onChange={(e) => setTexto(e.target.value)}
                           placeholder="Deixe o seu comentário sobre a questão ao votar"/>
                </FormGroup>
                <Button>Votar</Button> {/* (5) */}
            </Form>
        </>
    );
}

export default VoteForm;