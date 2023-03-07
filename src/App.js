import './App.css'
import './components/LoginPage/LoginPage.css'
import './components/RegisterPage/RegisterPage.css'
import './components/ForgotPasswordPage/ForgotPasswordPage.css'
import './components/EventsPage/EventsPage.css'
import './components/EventDetails/EventDetails.css'

import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswortPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventsPage from './components/EventsPage/EventsPage';
import EventDetails from './components/EventDetails/EventDetails'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="register" element={<RegisterPage/>}/>
          <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="events" element={<EventsPage/>}/>
          <Route path="event-details" element={<EventDetails/>}/>
          <Route path="*" element={<h1>404 - Page not found</h1>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
