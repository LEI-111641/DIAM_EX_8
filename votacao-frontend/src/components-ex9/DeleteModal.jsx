import {Button} from "reactstrap";
import axios from "axios";

function DeleteModal({question}){

    function deleteQuestion(){
        axios.delete(`http://localhost:8000/votacao/api/question/${question.id}`)
            .then(() => {
                alert("Questão apagada com sucesso!");
                window.location.reload();
            })
            .catch(() => {
                alert("Erro ao apagar a questão!");
            });
    }

    return (
        <Button onClick={deleteQuestion} color="danger">
            Apagar
        </Button>
    );
}

export default DeleteModal;