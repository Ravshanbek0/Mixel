import React, { useEffect, useState } from 'react'
import './SignModal.css'
import axios from 'axios'

function SignModal({ setModal, setToken }) {

  const [userLoginName, setUserLoginName] = useState()
  const [userLoginPassword, setUserLoginPassword] = useState()

  const [email, setEmail] = useState()
  const [first_name, setFirst_name] = useState()
  const [last_name, setLast_name] = useState()
  const [phone_number, setPhone_number] = useState()
  const [address, setAddress] = useState()


  const [isSingUp, setISignUp] = useState(true)

  function getToken(params) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": userLoginName,
      "password": userLoginPassword
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://ecommerce0003.pythonanywhere.com/token/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.access) {
          setToken(result.access)
          setModal(false)
          setUserLoginName("")
          setUserLoginPassword("")
          localStorage.setItem("token", result.access)
        } else {
          alert("Ma'lumot yo'q!")
        }
      })
      .catch((error) => console.error(error));
  }

  function postUser(e) {
    if (userLoginName != "",
      userLoginPassword != "",
      email != "",
      first_name != "",
      last_name != "",
      phone_number != "",
      address != "") {
      const formData = new FormData()
      formData.append("username", userLoginName)
      formData.append("password", userLoginPassword)
      formData.append("email", email)
      formData.append("first_name", first_name)
      formData.append("last_name", last_name)
      formData.append("phone_number", phone_number)
      formData.append("address", address)
      formData.append("city", 2)
      try {
        const response = axios.post("https://ecommerce0003.pythonanywhere.com/user/register/", formData

        );
        if (response) {
          getToken()
        }
      }
      catch (error) {
        console.error(error)
        alert("Xatolik mavjud!")
      }
    }else{
      alert("Barcha ma'lumotlar to'ldirilishi lozim!")
    }
  }


  return (
    <div className='modal-sign'>
      <p onClick={() => {
        setModal(false)
      }}>x</p>
      {isSingUp ?
        <form action="" className="form login">
          <label htmlFor="">Username:</label>
          <input value={userLoginName} onChange={(e) => {
            setUserLoginName(e.target.value)
          }} type="text" />
          <label htmlFor=""> Password:</label>
          <input value={userLoginPassword} onChange={(e) => {
            setUserLoginPassword(e.target.value)
          }} type="text" />

          <button type='button' onClick={() => {
            getToken()
          }}>Login</button>

          <h3 onClick={() => {
            setISignUp(false)
          }} >Sing Up</h3>
        </form>
        : <form className='form'>
          <div className="form-div">
            <div>
              <label htmlFor="">First name:</label>
              <input onChange={(e) => { setFirst_name(e.target.value) }} type="text" placeholder='first name' />
              <label htmlFor="">Password:</label>
              <input onChange={(e) => { setUserLoginPassword(e.target.value) }} type="text" placeholder='password' />
              <label htmlFor="">Email:</label>
              <input onChange={(e) => { setEmail(e.target.value) }} type="text" placeholder='email' />
              <label htmlFor="">Username:</label>
              <input onChange={(e) => { setUserLoginName(e.target.value) }} type="text" placeholder='username' />

            </div>
            <div>
              <label htmlFor="">Last name:</label>
              <input onChange={(e) => { setLast_name(e.target.value) }} type="text" placeholder='last name' />
              <label htmlFor="">Phone number:</label>
              <input onChange={(e) => { setPhone_number(e.target.value) }} type="text" placeholder='phone number' />

              <label htmlFor="">Address:</label>
              <input onChange={(e) => { setAddress(e.target.value) }} type="text" placeholder='address' />

            </div>
          </div>

          <button type='button' onClick={postUser} >Sign up</button>
          <h3 onClick={() => {
            setISignUp(true)
          }} >Login</h3>
        </form>}

    </div>
  )
}

export default SignModal