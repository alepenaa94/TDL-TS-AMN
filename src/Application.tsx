import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about";
import HomePage from "./pages/home";

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage name="home page"/>}/>
            <Route path="/about" element={<AboutPage name="about page"/>}/>
        </Routes>
    </BrowserRouter>
    );
};

export default Application
