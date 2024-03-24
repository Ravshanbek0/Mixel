import { useEffect, useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import Telephones from './pages/Filter/Filter'
import Laptop from './pages/notebook/SingleCard'
import { Slider } from '@mui/material'
import Filter from './pages/Filter/Filter'
import Loader from './components/loader/Loader'
import SignModal from './components/sign-modal/SignModal'


function App() {
    const [inputValue, setInputValue] = useState()
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState(false)

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)


    function getUser(params) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch("https://ecommerce0003.pythonanywhere.com/user/retrieve/", requestOptions)
            .then((response) => response.json())
            .then((result) => setUser(result))
            .catch((error) => console.error(error));
    }
    useEffect(()=>{
        getUser()
    },[token])

    console.log(user);

    return (
        <>
            <BrowserRouter>
                <Navbar setLoader={setLoader} setToken={setToken} user={user} setModal={setModal} setInputValue={setInputValue} />
                {loader && <Loader />}
                {modal && <SignModal setToken={setToken} setModal={setModal} />}
                <Routes>
                    <Route path='/' element={<Home setLoader={setLoader} />} />
                    <Route path='/filter/:type' element={<Filter inputValue={inputValue} setLoader={setLoader} />} />
                    <Route path='/card/:id' element={<Laptop setLoader={setLoader} />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
