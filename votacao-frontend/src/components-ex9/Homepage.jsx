import {Col, Container, Row} from "reactstrap";
import QuestionTable from "../components/QuestionTable.jsx";
import Header from "../components/Header.jsx";

function Homepage() {
    return (<>
        <Header/>
        <Content/>
    </>);
}

function Content() {
    return (
        <Container style={{marginTop: "20px", maxWidth: "800px"}}>
            <Row>
                <Col>
                    <QuestionTable/>
                </Col>
            </Row>
        </Container>
    );
}

export default Homepage;
