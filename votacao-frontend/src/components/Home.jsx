import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "../components-ex9/Homepage.jsx";
import Teste from "../components-ex9/Teste.jsx";
import VotePage from "../components-ex9/VotePage.jsx";
import NewQuestionPage from "../components-ex9/NewQuestionPage.jsx";

function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/teste" element={<Teste/>}/>
                <Route path="/votacao/:id" element={<VotePage/>} />
                <Route path="/nova-questao" element={<NewQuestionPage/>} />
            </Routes>
        </BrowserRouter>
    );
}



export default Home;