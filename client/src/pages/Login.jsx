import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setUser } from '../redux/store';
export default function Login() {
    const Navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const loginUser = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/loginUser', { email, password })
        if (data.error) {
            toast.error(data.error)
        } else {
            dispatch(setUser(data));
            localStorage.setItem("user", JSON.stringify(data))
            toast.success('Login Succesfull. Welcome!')
            Navigate('/')
        }
    }
    return (
        <div className='m-12'>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label> Password </label>
                <input type="text" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
