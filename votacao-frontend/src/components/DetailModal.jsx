import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";

function DetailModal({question}) {
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/question/${question.id}`, {
            state: {question}
        });
    };

    return (
        <Button onClick={goToDetails} color="warning">
            Detalhe
        </Button>
    );
}

export default DetailModal;
