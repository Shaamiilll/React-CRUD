import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import  { toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'



export default function Register() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [name , setName] = useState('')
    const [phone , setPhone] = useState('')

    const Navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const {data} = await axios.post('/registerUser',{
                name , email , password , phone
            })
            if(data.error){
                toast.error(data.error)
            }else{
                setEmail(email)
                setName(name)
                setPassword(password)
                setPhone(phone)
                toast.success('Login Succesfull. Welcome!')
                Navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='m-12'>
            <form onSubmit={handleRegister}>
                <label> Name </label>
                <input type="text" placeholder='Enter name..' value={name} onChange={(e) => setName(e.target.value)} />
                <label> Email </label>
                <input type="text" placeholder='Enter Email'  value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label> Password </label>
                <input type="text" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <label> Phone </label>
                <input type="text" placeholder='Enter Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
