import  {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody} from "reactstrap";
import axios from "axios";
import VoteForm from "./VoteForm";

function VoteModal({question}) {
    const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
    const [showModal, setShowModal] = useState(false);
    const [optionList, setOptionList] = useState([]);
    const getOptions = () => {
        axios.get(URL_OPTIONS + question.id)
            .then(request => {
                setOptionList(request.data);
            });
    };
    const toggleModal = () => {
        if (!showModal) getOptions();
        setShowModal(showModal => !showModal);
    };
    return (
        <>
            <Button onClick={toggleModal} color="success">
                Votar
            </Button>
            <Modal isOpen={showModal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>
                    Voto na questão {question.id}
                </ModalHeader>
                <ModalBody>
                    <VoteForm options={optionList}
                              question={question}
                              toggle={toggleModal}/>
                </ModalBody>
            </Modal>
        </>
    );
}

export default VoteModal;