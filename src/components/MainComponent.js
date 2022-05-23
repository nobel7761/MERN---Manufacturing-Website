import React from 'react';
import Header from './Shared/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Authentication/Login/Login';
import Register from './Authentication/Register/Register';
import Footer from './Shared/Footer/Footer';
import Blogs from './Pages/Blogs/Blogs';

const MainComponent = () => {
    return (
        <div>
            <Header></Header>

            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/home' element={<Home></Home>}></Route>
                <Route path='/about' element={<About></About>}></Route>
                <Route path='/blogs' element={<Blogs></Blogs>}></Route>

                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/register' element={<Register></Register>}></Route>


            </Routes>

            <Footer></Footer>
        </div>
    );
};

export default MainComponent;