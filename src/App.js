import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';




function App() {

  const [show, setShow] = useState(false);

  const [alert, setAlert] = useState(null);

  const [userData, setUserData] = useState({name: ''});

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1200);
  }

  return (
    <>
    <NoteState>
      <Router>
        <Navbar {...{setShow, userData}}/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
           <Route exact path='/' element={<Home showAlert={showAlert} {...{show, setShow, setUserData}}/>}></Route>
           <Route exact path='/about' element={<About/>}></Route>
           <Route exact path='/login' element={<Login showAlert={showAlert}/>}></Route>
           <Route exact path='/signup' element={<Signup showAlert={showAlert}/>}></Route>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
