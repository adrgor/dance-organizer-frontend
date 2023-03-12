import './components/EventsPage/EventsPage.css'
import './components/EventDetails/EventDetails.css'

import ForgotPasswordPage from './components/ForgotPasswordPage/ForgotPasswortPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import EventsPage from './components/EventsPage/EventsPage';
import EventDetails from './components/EventDetails/EventDetails'

function App() {

  return (
    <div className='App h-14 bg-[url("/public/social-dance.webp")] bg-cover h-full flex flex-col items-center justify-evenly'>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='forgot-password' element={<ForgotPasswordPage/>}/>
          <Route path='events' element={<EventsPage/>}/>
          <Route path='event-details' element={<EventDetails/>}/>
          <Route path='*' element={<Navigate replace to = '/login'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
