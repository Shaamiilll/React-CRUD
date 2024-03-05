import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { setAdmin } from '../redux/store'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";

export default function AdminLogin() {
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginAdmin = async (e) => {
        e.preventDefault()

        const { data } = await axios.post('/adminlogin', { email, password })

        if (data.error) {
            toast.error(data.error)
        }
        if (data) {

            dispatch(setAdmin())
            toast.success("welcome Admin!")
            Navigate('/admin-dashboard')
        }
    }
    return (
        <div className='m-12'>
            <form onSubmit={loginAdmin}>
                <label>Email</label>
                <input type="text" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label> Password </label>
                <input type="text" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>

    )
}
