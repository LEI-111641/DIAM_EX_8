import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "../components-ex9/Homepage.jsx";
import Teste from "../components-ex9/Teste.jsx";
import VotePage from "../components-ex9/VotePage.jsx";
import NewQuestionPage from "../components-ex9/NewQuestionPage.jsx";
import CreateQuestion from "../components-ex9/CreateQuestion.jsx";
import QuestionDetails from "../components-ex9/QuestionDetails.jsx";

function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/teste" element={<Teste/>}/>
                <Route path="/votacao/:id" element={<VotePage/>} />

                {/* Rota do teu componente de criação */}
                <Route path="/nova-questao" element={<NewQuestionPage/>} />

                {/* Rotas do Figueira */}
                <Route path="/create" element={<CreateQuestion/>}/>
                <Route path="/question/:id" element={<QuestionDetails/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Home;