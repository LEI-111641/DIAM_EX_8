import {useState} from "react";
import {Button, Form, FormGroup, Table, Label} from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({options, question, toggle}) {
    const URL_OPTION = "http://localhost:8000/votacao/api/option/"; // (1)

    const [selectedOption, setSelectedOption] = useState(-1); // (2)
    const voteAndCloseModal = (event) => { // (3)
        event.preventDefault();
        if (selectedOption >= 0) {
            const option = {...options[selectedOption]};
            option.votos++;
            axios.put(URL_OPTION + option.id, option).then();
        }
        toggle()
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
                <Button>Votar</Button> {/* (5) */}
            </Form>
        </>
    );
}

export default VoteForm;