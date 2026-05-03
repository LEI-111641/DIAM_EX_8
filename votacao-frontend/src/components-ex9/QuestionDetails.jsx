import axios from "axios";
import {useEffect, useState} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import {Button, Table, FormGroup, Input} from "reactstrap";
import moment from "moment";

function QuestionDetails() {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const question = location.state?.question;

    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/" + id;
    const URL_OPTION = "http://localhost:8000/votacao/api/option/";
    const URL_QUESTION = "http://localhost:8000/votacao/api/question/" + id;
    const URL_COMMENTS = "http://localhost:8000/votacao/api/comments/" + id;

    const [optionList, setOptionList] = useState([]);
    const [commentList, setCommentList] = useState([]);
    const [novaOpcao, setNovaOpcao] = useState("");
    const [editandoQuestao, setEditandoQuestao] = useState(false);
    const [questaoTexto, setQuestaoTexto] = useState(question?.questao_texto || "");
    const [editandoOpcaoId, setEditandoOpcaoId] = useState(-1);
    const [opcaoTextoEdit, setOpcaoTextoEdit] = useState("");

    const loadOptions = function () {
        axios.get(URL_OPTIONS)
            .then(function (res) {
                setOptionList(res.data);
            });
    };

    const loadComments = function () {
        axios.get(URL_COMMENTS)
            .then(function (res) {
                setCommentList(res.data);
            });
    };

    useEffect(function () {
        loadOptions();
        loadComments();
    }, [id]);

    // Adicionar opção
    const adicionarOpcao = function () {
        if (novaOpcao !== "") {
            axios.post(URL_OPTIONS, {
                questao: id,
                opcao_texto: novaOpcao,
                votos: 0
            }).then(function () {
                setNovaOpcao("");
                loadOptions();
            });
        }
    };

    // Apagar opção
    const apagarOpcao = function (opcaoId) {
        axios.delete(URL_OPTION + opcaoId)
            .then(function () {
                loadOptions();
            });
    };

    // Guardar edição da questão
    const guardarQuestao = function () {
        axios.put(URL_QUESTION, {
            questao_texto: questaoTexto,
            pub_data: question.pub_data
        }).then(function () {
            setEditandoQuestao(false);
            question.questao_texto = questaoTexto;
        });
    };

    // Começar a editar uma opção
    const comecarEditarOpcao = function (opcao) {
        setEditandoOpcaoId(opcao.id);
        setOpcaoTextoEdit(opcao.opcao_texto);
    };

    // Guardar edição de uma opção
    const guardarOpcao = function (opcao) {
        axios.put(URL_OPTION + opcao.id, {
            questao: id,
            opcao_texto: opcaoTextoEdit,
            votos: opcao.votos
        }).then(function () {
            setEditandoOpcaoId(-1);
            setOpcaoTextoEdit("");
            loadOptions();
        });
    };

    if (!question) return <p>Sem dados da pergunta (refresh da página?)</p>;

    return (
        <div className="container" style={{marginTop: "20px"}}>
            <h2>Detalhe da questão {question.id}</h2>
            <hr/>

            {/* Texto da questão - com edição */}
            <FormGroup>
                <b>Texto:</b>
                {editandoQuestao ? (
                    <div>
                        <Input
                            type="text"
                            value={questaoTexto}
                            onChange={function (e) {
                                setQuestaoTexto(e.target.value);
                            }}
                        />
                        <Button color="primary" size="sm" style={{marginTop: "5px"}}
                                onClick={guardarQuestao}>
                            Guardar
                        </Button>
                        <Button color="secondary" size="sm" style={{marginTop: "5px", marginLeft: "5px"}}
                                onClick={function () {
                                    setEditandoQuestao(false);
                                    setQuestaoTexto(question.questao_texto);
                                }}>
                            Cancelar
                        </Button>
                    </div>
                ) : (
                    <div>
                        <p>{question.questao_texto}</p>
                        <Button color="info" size="sm"
                                onClick={function () {
                                    setEditandoQuestao(true);
                                }}>
                            Editar Questão
                        </Button>
                    </div>
                )}
                <b style={{marginTop: "10px", display: "block"}}>Data de publicação:</b>
                <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
            </FormGroup>

            {/* Tabela de opções - com edição e apagar */}
            <h4>Opções</h4>
            <Table>
                <thead>
                <tr>
                    <th style={{textAlign: "left"}}>Opção</th>
                    <th style={{textAlign: "right"}}>Votos</th>
                    <th style={{textAlign: "center"}}>Ações</th>
                </tr>
                </thead>
                <tbody>
                {optionList.map(function (o) {
                    return (
                        <tr key={o.id}>
                            <td style={{textAlign: "left"}}>
                                {editandoOpcaoId === o.id ? (
                                    <Input
                                        type="text"
                                        value={opcaoTextoEdit}
                                        onChange={function (e) {
                                            setOpcaoTextoEdit(e.target.value);
                                        }}
                                    />
                                ) : (
                                    o.opcao_texto
                                )}
                            </td>
                            <td style={{textAlign: "right"}}>{o.votos}</td>
                            <td style={{textAlign: "center"}}>
                                {editandoOpcaoId === o.id ? (
                                    <div>
                                        <Button color="primary" size="sm"
                                                onClick={function () {
                                                    guardarOpcao(o);
                                                }}>
                                            Guardar
                                        </Button>
                                        <Button color="secondary" size="sm" style={{marginLeft: "5px"}}
                                                onClick={function () {
                                                    setEditandoOpcaoId(-1);
                                                }}>
                                            Cancelar
                                        </Button>
                                    </div>
                                ) : (
                                    <div>
                                        <Button color="info" size="sm"
                                                onClick={function () {
                                                    comecarEditarOpcao(o);
                                                }}>
                                            Editar
                                        </Button>
                                        <Button color="danger" size="sm" style={{marginLeft: "5px"}}
                                                onClick={function () {
                                                    apagarOpcao(o.id);
                                                }}>
                                            Apagar
                                        </Button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>

            {/* Adicionar nova opção */}
            <h4>Adicionar nova opção</h4>
            <FormGroup>
                <Input
                    type="text"
                    value={novaOpcao}
                    onChange={function (e) {
                        setNovaOpcao(e.target.value);
                    }}
                    placeholder="Texto da nova opção"
                />
            </FormGroup>
            <Button color="success" onClick={adicionarOpcao}>
                Adicionar Opção
            </Button>

            <hr/>

            {/* Comentários */}
            <h4>Comentários</h4>
            <Table>
                <thead>
                <tr>
                    <th style={{textAlign: "left"}}>Username</th>
                    <th style={{textAlign: "left"}}>Comentário</th>
                </tr>
                </thead>
                <tbody>
                {commentList.map(function (c) {
                    return (
                        <tr key={c.id}>
                            <td style={{textAlign: "left"}}>{c.autor}</td>
                            <td style={{textAlign: "left"}}>{c.texto}</td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>

            <Button color="secondary" onClick={function () {
                navigate("/");
            }}>
                Voltar
            </Button>
        </div>
    );
}

export default QuestionDetails;