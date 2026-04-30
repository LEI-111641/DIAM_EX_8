import {Button, Form, FormGroup, Table} from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function DetailData({options, question, toggle}) { // (1)
    const closeModal = (e) => { // (2)
        e.preventDefault();
        toggle();
    }
    const navigate = useNavigate();

    const goToHome = () => {
        navigate(`/`);
    };

    return (
        <Form onSubmit={closeModal}> {/* (3) */}
            <FormGroup>
                <b>Texto:</b>
                <p>{question.questao_texto} </p>
                <b>Data de publicação:</b>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p> {/* (4) */}
            </FormGroup>
            <FormGroup>
                <Table>
                    <thead>
                    <tr>
                        <th style={{textAlign: "left"}}>Opção</th>
                        <th style={{textAlign: "right"}}>Votos</th>
                    </tr>
                    </thead>
                    <tbody>
                    {options.map(o => // (5)
                        <tr key={o.id}>
                            <td style={{textAlign: "left"}}>{o.opcao_texto}</td>
                            <td style={{textAlign: "right"}}>{o.votos}</td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </FormGroup>
            <Button onClick={goToHome}>Fechar</Button> {/* (3) */}
        </Form>
    );
}

export default DetailData;