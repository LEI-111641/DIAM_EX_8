import React, {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import axios from "axios";
import DetailData from "./DetailData";

function DetailModal({question}) { // (1)
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/"; // (2)
    const URL_COMMENTS = "http://localhost:8000/votacao/api/comments/";
    const [showModal, setShowModal] = useState(false); // (3)
    const [optionList, setOptionList] = useState([]); // (4)
    const [commentList, setCommentList] = useState([]);

    const getOptionsAndComments = () => { // (5)
        axios.get(URL_OPTIONS + question.id)
            .then(request => {
                setOptionList(request.data);
            });
        axios.get(URL_COMMENTS + question.id)
            .then(request => {
                setCommentList(request.data);
            });
    };
    const toggleModal = () => { // (6)
        if (!showModal) getOptionsAndComments();
        setShowModal(showModal => !showModal);
    };
    return (
        <>
            <Button onClick={toggleModal} color="warning"> {/* (7) */}
                Detalhe
            </Button>
            <Modal isOpen={showModal} toggle={toggleModal}> {/* (8) */}
                <ModalHeader toggle={toggleModal}>
                    Detalhe da questão {question.id}
                </ModalHeader>
                <ModalBody>
                    <DetailData options={optionList}
                                comments={commentList}
                                question={question}
                                toggle={toggleModal}/> {/* (9) */}
                </ModalBody>
            </Modal>
        </>
    );
}

export default DetailModal;