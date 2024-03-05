import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { BiBrush } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/store';

export default function EditUserForm() {
    const userData = useSelector((state) => state.auth);
    const dispatch = useDispatch();
   
    const [formData, setFormData] = useState({
        firstname: userData.user.name,
        email: userData.user.email,
        phone: userData.user.phone,
        image: userData.user.image
    });

    const uploadFile = async () => {
        const data = new FormData();
        data.append("file", formData.image);
        data.append("upload_preset", 'images_preset');
        data.append("cloud_name", "db2kn0rhf");

        try {
            let api = "https://api.cloudinary.com/v1_1/db2kn0rhf/image/upload";
            const res = await axios.post(api, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: false,
            });
            const { secure_url } = res.data;
            return secure_url;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const handleFormData = async (e) => {
        e.preventDefault();
        try {
          
            let imageUrl = await uploadFile();
            formData.image=imageUrl;
            const userId = userData.user._id;
            const updatedFormData = { ...formData, userId };
            const response = await axios.post('/edituser', updatedFormData);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                dispatch(setUser(response.data));
                localStorage.setItem("user", JSON.stringify(response.data));
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <form className='grid lg:grid-cols-3 w-4/6 gap-4' onSubmit={handleFormData}>
            <div className='input-type'>
                <input type="text" onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} value={formData.firstname} name='firstname' placeholder='FirstName' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="text" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} name='email' placeholder='email' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="number" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} value={formData.phone} name='phone' placeholder='phonenumber' className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <div className='input-type'>
                <input type="file" accept='image/*' id='img' name='image' onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className='border w-full px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <button type="submit" className='flex justify-center text-md w-40 bg-yellow-400 text-white px-3 py-3 border rounded-xl hover:bg-gray-50 hover:border-green-500 hover:text-green-500'>
                Update <span className='px-1'><BiBrush size={24}></BiBrush></span>
            </button>
        </form>
    );
}
