import "./App.css";
import Navbar from "@/components/Navbar.tsx";
import {ThemeProvider} from "@/components/ThemeProvider.tsx"

import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "@/pages/NotFound.tsx";
import Manifesto from "@/pages/Manifesto.tsx";
import Themes from "@/pages/Themes.tsx";

function App() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Router>
                <AppContent/>
            </Router>
        </ThemeProvider>
    );
}

function AppContent() {

    return (
        <> <Navbar/>
            <div className="container mt-24">
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/manifesto" Component={Manifesto}/>
                    <Route path="/themes" Component={Themes}/>

                    <Route path='*' Component={NotFound}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
