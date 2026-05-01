import {Button, Form, FormGroup, Table} from "reactstrap";
import moment from "moment";
import {useNavigate} from "react-router-dom";

function DetailData({options, comments, question, toggle}) {
    const navigate = useNavigate();

    const closeModal = (e) => {
        e.preventDefault();
        toggle();
    };

    const goToHome = () => {
        navigate(`/`);
    };

    return (
        <div className="container" style={{marginTop: "20px"}}>
            <h2>Detalhes da Questão #{question.id}</h2>
            <hr/>

            <Form onSubmit={closeModal}>
                <FormGroup>
                    <strong>Texto:</strong>
                    <p>{question.questao_texto}</p>

                    <strong>Data de publicação:</strong>
                    <p className="text-muted">
                        {moment(question.pub_data).format("YYYY-MM-DD HH:mm")}
                    </p>
                </FormGroup>

                <FormGroup>
                    <Table borderless size="sm">
                        <thead>
                        <tr>
                            <th style={{textAlign: "left"}}>Opção</th>
                            <th style={{textAlign: "right"}}>Votos</th>
                        </tr>
                        </thead>
                        <tbody>
                        {options.map(o => (
                            <tr key={o.id}>
                                <td style={{textAlign: "left"}}>{o.opcao_texto}</td>
                                <td style={{textAlign: "right"}}>
                                    <strong>{o.votos}</strong>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </FormGroup>

                <FormGroup>
                    <strong>Comentários:</strong>
                    {(!comments || comments.length === 0) ? (
                        <p className="text-muted"><small>Ainda não há comentários.</small></p>
                    ) : (
                        <div style={{
                            marginTop: "10px",
                            maxHeight: "250px",
                            overflowY: "auto",
                            paddingRight: "10px"
                        }}>
                            {comments.map(c => (
                                <div key={c.id} style={{
                                    marginBottom: "15px",
                                    borderBottom: "1px solid #eee",
                                    paddingBottom: "10px"
                                }}>
                                    <strong>{c.autor || "Anónimo"}</strong>
                                    <small className="text-muted ms-2">
                                        ({moment(c.data).format("YYYY-MM-DD HH:mm")})
                                    </small>
                                    <p style={{margin: "5px 0 0 0"}}>{c.comentario_texto || c.texto}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </FormGroup>

                <div style={{marginTop: "20px"}}>
                    <Button color="secondary" onClick={goToHome}>
                        Fechar e Voltar
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default DetailData;