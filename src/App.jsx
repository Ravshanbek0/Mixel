import { useEffect, useState } from 'react'
import axios from 'axios'
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
import LikeProducts from './pages/LikeProducts/LikeProducts'


function App() {
    const [inputValue, setInputValue] = useState()
    const [loader, setLoader] = useState(false)
    const [modal, setModal] = useState(false)

    const [token, setToken] = useState(localStorage.getItem("token"))
    const [user, setUser] = useState(null)
    const [likeData, setLikeData] = useState([])


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
            .catch((error) => alert(error));
    }
    const handleLike = async (product_id) => {
        const token_acc = localStorage.getItem("token")
        if (token_acc) {
            try {
                const response = await axios.post(
                    "https://ecommerce0003.pythonanywhere.com/action/liked/",
                    { product: product_id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (response.status === 200) {
                    setLiked(true);

                }
            } catch (error) {
            }
        } else {
            alert("Ro'yxatdan o'ting!")
        }

    };
    useEffect(() => {
        getUser()
    }, [token])


    return (
        <>
            <BrowserRouter>
                <Navbar setLoader={setLoader} likeData={likeData} setToken={setToken} user={user} setModal={setModal} setInputValue={setInputValue} />
                {loader && <Loader />}
                {modal && <SignModal setToken={setToken} setModal={setModal} />}
                <Routes>
                    <Route path='/' element={<Home handleLike={handleLike} setLoader={setLoader} />} />
                    <Route path='/filter/:type' element={<Filter handleLike={handleLike} inputValue={inputValue} setLoader={setLoader} />} />
                    <Route path='/card/:id' element={<Laptop setLoader={setLoader} />} />
                    <Route path='/likeProducts' element={<LikeProducts setLikeData={setLikeData}/>} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
