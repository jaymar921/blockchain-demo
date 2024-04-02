import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Register, Account as AccountPage, Blockchain } from './pages';
import { Navbar } from './components';
import "./App.css";

const App = () => {
  return (
    <main>
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path='/account' element={<AccountPage />}/>
                <Route path='/blockchain' element={<Blockchain />}/>
            </Routes>
        </Router>
    </main>
  )
}

export default App