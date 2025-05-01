import React from 'react';
import AddLeaveYear from './pages/AddLeaveYear';
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';

function App() {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/add' element={<AddLeaveYear />} />
            </Routes>
        </BrowserRouter>
    </>
}

export default App;
