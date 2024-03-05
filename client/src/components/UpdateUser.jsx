import React from 'react';
import { useReducer } from 'react';
import { BiBrush } from 'react-icons/bi'
import { useSelector, useDispatch } from 'react-redux'
import { updateAction } from '../redux/store';
import { toast } from 'react-hot-toast'
import axios from 'axios';

const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value || state[event.target.name]
    }
}

export default function UpdateUser() {
    const [formData, setFormData] = useReducer(formReducer, {})
    const userData = useSelector((state) => state.crudapp.client.formId)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userId = userData._id;

        const updatedFormData = { ...formData, userId };
      
        try {
            const response = await axios.post('/edituser', updatedFormData)
            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                toast.success("Data Updated Successfully")
            }
        } catch (error) {
            console.error('Error updating user:', error);
           
        }
    }

    return (
        <form className='grid lg:grid-cols-3 w-4/6 gap-4' onSubmit={handleSubmit}>
            <div className='input-type'>
                <input type="text" onChange={setFormData} value={formData.firstname || userData.name} name='firstname' placeholder='FirstName' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="text" onChange={setFormData} value={formData.email || userData.email} name='email' placeholder='email' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>

            <div className='input-type'>
                <input type="number" onChange={setFormData} value={formData.phone || userData.phone} name='phone' placeholder='phonenumber' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>

            <button className='flex justify-center text-md w-40 bg-yellow-400 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>Update <span className='px-1'><BiBrush size={24}></BiBrush></span></button>
        </form >
    );
}
