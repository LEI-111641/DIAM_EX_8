import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "../components-ex9/Homepage.jsx";
import VotePage from "../components-ex9/VotePage.jsx";
import NewQuestionPage from "../components-ex9/NewQuestionPage.jsx";
import QuestionDetails from "../components-ex9/QuestionDetails.jsx";

function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/votacao/:id" element={<VotePage/>}/>
                <Route path="/nova-questao" element={<NewQuestionPage/>}/>
                <Route path="/question/:id" element={<QuestionDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default Home;