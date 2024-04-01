import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from './pages';
import { Navbar } from './components';
import "./App.css";

const App = () => {
  return (
    <main>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}/>
            </Routes>
        </Router>
    </main>
  )
}

export default App