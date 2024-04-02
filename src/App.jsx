import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Register, Account as AccountPage, Blockchain, Transact } from './pages';
import { Navbar } from './components';
import "./App.css";
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

const App = () => {
  return (
    
    <MantineProvider defaultColorScheme='dark'>
      <Notifications position="bottom-left" zIndex={1000} className="absolute max-w-[20px] w-[50px]" limit={5} autoClose={5000}/>
      <main>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>
                    <Route path='/account' element={<AccountPage />}/>
                    <Route path='/blockchain' element={<Blockchain />}/>
                    <Route path='/transact' element={<Transact />}/>
                </Routes>
            </Router>
      </main>
    </MantineProvider>
  )
}

export default App