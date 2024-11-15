import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './LoginForm';
import Planing from './Planing';
import PlaningLocateur from './PlaningLocateur';
import Locateur from './Locateur'
import ReservationList from "./ReservationList";
import PropertyManagement from "./PropertyManagement"
import OtherSettings from "./OtherSettings"
import LocataireList from "./LocataireList"
import PropertyManagementLocateur from "./PropertyManagementLocateur";
import ReservationListLocateur from "./ReservationListLocateur";
import PromoManagement from "./PromoManagement";
import PromoManagementAdmin from "./PromoManagementAdmin";
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/locateur" element={<Locateur />} />
            <Route path="/planing" element={<Planing />} />
            <Route path="/planingLocateur" element={<PlaningLocateur />} />
            <Route path="/ReservationList" element={<ReservationList />} />
            <Route path="/ReservationListLocateur" element={<ReservationListLocateur />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/OtherSettings" element={<OtherSettings />} />
            <Route path="/PropertyManagement" element={<PropertyManagement />} />
            <Route path="/PropertyManagementLocateur" element={<PropertyManagementLocateur />} />
            <Route path="/LocataireList" element={<LocataireList />} />
            <Route path="/PromoManagement" element={<PromoManagement />} />
            <Route path="/PromoManagementAdmin" element={<PromoManagementAdmin />} />
        </Routes>
    );
}

export default App;
