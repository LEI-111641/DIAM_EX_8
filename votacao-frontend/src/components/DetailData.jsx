import React from "react";
import { Button, Form, FormGroup, Table } from "reactstrap";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function DetailData({ options, comments, question, toggle }) {
    const navigate = useNavigate();

    const closeModal = (e) => {
        e.preventDefault();
        toggle();
    };

    const goToHome = () => {
        navigate(`/`);
    };

    return (
        <Form onSubmit={closeModal}>
            <FormGroup>
                <b>Texto:</b>
                <p>{question.questao_texto} </p>
                <b>Data de publicação:</b>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
            </FormGroup>

            <FormGroup>
                <Table>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left" }}>Opção</th>
                            <th style={{ textAlign: "right" }}>Votos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.map(o => (
                            <tr key={o.id}>
                                <td style={{ textAlign: "left" }}>{o.opcao_texto}</td>
                                <td style={{ textAlign: "right" }}>{o.votos}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </FormGroup>

            {/* Início da tua secção de Comentários */}
            <FormGroup>
                <b>Comentários:</b>
                {(!comments || comments.length === 0) ? (
                    <p className="text-muted"><small>Ainda não há comentários.</small></p>
                ) : (
                    <div style={{ maxHeight: "200px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                        {comments.map(c => (
                            <div key={c.id} style={{ marginBottom: "10px", paddingBottom: "5px", borderBottom: "1px solid #eee" }}>
                                <strong>{c.autor}</strong> <small className="text-muted">({moment(c.data).format("YYYY-MM-DD HH:mm")})</small>
                                <p style={{ margin: "5px 0 0 0" }}>{c.texto}</p>
                            </div>
                        ))}
                    </div>
                )}
            </FormGroup>
            {/* Fim da secção de Comentários */}

            {/* Botão do Figueira com a navegação */}
            <Button onClick={goToHome}>Fechar</Button>
        </Form>
    );
}

export default DetailData;