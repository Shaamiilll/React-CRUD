import axios from 'axios';
import React from 'react';
import { useReducer } from 'react';
import { BiPlus } from 'react-icons/bi'
import { toast } from 'react-hot-toast'


const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value
    }
}

export default function Adduser() {
    const [formData, setFormData] = useReducer(formReducer, {})
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.post('/adduser', formData)
        if (data.error) {
            toast.error(data.error)
        } else {
            toast.success("Data Inserted Successfull")  
        }
    }
    return (
        <form className='grid lg:grid-cols-3 w-4/6 gap-4' onSubmit={handleSubmit}>
            <div className='input-type'>
                <input type="text" onChange={setFormData} name='firstname' placeholder='FirstName' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="text" onChange={setFormData} name='email' placeholder='email' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="password" onChange={setFormData} name='password' placeholder='Password' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="number" onChange={setFormData} name='phone' placeholder='Phone' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>

            <button className='flex justify-center text-md w-40 bg-green-500 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>Submit <span className='px-1'><BiPlus size={24}></BiPlus></span></button>
        </form >
    );
}
