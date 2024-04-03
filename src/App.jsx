import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home, Login, Register, Account as AccountPage, Blockchain, Transact } from './pages';
import { Navbar } from './components';
import "./App.css";
import '@mantine/notifications/styles.css';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { IsMobile } from "./utilities/utility";
import { useState } from "react";

const App = () => {
  const [showNotification, setShowNotification] = useState(true);
  return (
    
    <MantineProvider defaultColorScheme='dark'>
      <Notifications position={IsMobile()?"top-center": "bottom-left"} zIndex={1000} className="absolute font-minecraft text-[0.7rem]" display={showNotification?"block":"none"} limit={IsMobile()?2:4} autoClose={IsMobile()?1000:3000}/>
      <main>
            <Router>
                <Navbar showNotifications={setShowNotification} />
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