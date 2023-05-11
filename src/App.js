import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswortPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddEvent from "./components/EventDetails/AddEvent";
import EditEvent from "./components/EventDetails/EditEvent";
import EventDetails from "./components/EventsPage/EventDetails";
import EventsPage from "./components/EventsPage/EventsPage";
import ProductsPage from "./components/RegistrationDashboard/ProductsPage/ProductsPage";
import RegistrationDashboard from "./components/RegistrationDashboard/RegistrationDashboard";
import RegistrationForm from "./components/RegistrationDashboard/RegistrationForm/RegistrationForm";
import TicketPage from "./components/RegistrationDashboard/TicketsPage/TicketPage";
import ClientRegistrationForm from "./components/ParticipantRegistrationForm/ParticipantRegistrationForm";
import ParticipantRegistrationForm from "./components/ParticipantRegistrationForm/ParticipantRegistrationForm";

function App() {
  return (
    <div className='bg-[url("/public/social-dance.webp")] bg-cover h-full flex flex-col items-center justify-evenly overflow-y-auto overflow-x-hidden select-none'>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="my-events" element={<EventsPage isMyList={true} />} />
          <Route path="add-event" element={<AddEvent />} />
          <Route path="event-details/:id" element={<EventDetails />} />
          <Route path="edit-event/:id" element={<EditEvent />} />
          <Route
            path="registration-dashboard"
            element={<RegistrationDashboard />}
          />
          <Route
            path="registration-dashboard/tickets"
            element={<TicketPage />}
          />
          <Route
            path="registration-dashboard/products"
            element={<ProductsPage />}
          />
          <Route
            path="registration-dashboard/registration-form"
            element={<RegistrationForm />}
          />
          <Route 
            path="register-for-event" 
            element={<ParticipantRegistrationForm/>}
          />
          <Route 
            path="*" 
            element={<Navigate replace to="/login" />} 
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
