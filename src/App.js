import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./style.css";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";

const App = () => {
    return (
        <Router>
            <h1>Darsh's Pokedex</h1>

            {/* Routes */}
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/" exact element={<Pokedex />} />
                <Route path="/pokemon/:id" element={<Pokemon />} />
            </Routes>
        </Router>
    );
};

export default App;
