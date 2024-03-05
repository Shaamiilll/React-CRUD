import axios from 'axios';
import React, { useReducer , useState } from 'react';
import toast from 'react-hot-toast';
import { BiBrush } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../redux/store';
const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value || state[event.target.name]
    }
}

export default function EditUserForm() {

    const user = useSelector((state) => state.auth);
    const [formData, setFormData] = useReducer(formReducer, {})
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const [image, setImage] = useState();

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleFormData = async (e) => {
        e.preventDefault()
        const userId = userData.user._id;
        const updatedFormData = { ...formData, userId };
        try {
            const response = await axios.post('/edituser', updatedFormData)
            if (response.data.error) {
                toast.error(response.data.error)
            } else {
                dispatch(setUser(response.data));
                localStorage.setItem("user", JSON.stringify(response.data))
            }
        } catch (error) {
            console.error('Error updating user:', error);

        }
    }

    return (
        <form className='grid lg:grid-cols-3 w-4/6 gap-4' onSubmit={handleFormData} >
            <div className='input-type'>
                <input type="text" onChange={setFormData} value={formData.firstname || userData.user.name} name='firstname' placeholder='FirstName' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="text" onChange={setFormData} value={formData.email || userData.user.email} name='email' placeholder='email' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>

            <div className='input-type'>
                <input type="number" onChange={setFormData} value={formData.phone || userData.user.phone} name='phone' placeholder='phonenumber' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>

            <div className='input-type'>
                <input type="file" name='image' onChange={(e) =>handleUploadFile(e)} className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
    

            <button className='flex justify-center text-md w-40 bg-yellow-400 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>Update <span className='px-1'><BiBrush size={24}></BiBrush></span></button>
        </form >
    );
}

