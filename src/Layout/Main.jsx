import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../pages/Shared/Components/Navbar/Navbar';
import Footer from '../pages/Shared/Components/Footer/Footer';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;