import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Homepage from "../components-ex9/Homepage.jsx";
import Teste from "../components-ex9/Teste.jsx";

function Home() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/teste" element={<Teste/>}/>
            </Routes>
        </BrowserRouter>
    );
}



export default Home;