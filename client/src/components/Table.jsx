import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BiEdit, BiTrashAlt } from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux'
import { toggleChangeAction, updateAction } from '../redux/store';

export default function Table() {


    const [userData, setUserData] = useState([]);
    const [flag, setFlag] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/getUser');
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userData]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Are you sure want to delete')

        if (confirmed) {
            const { data } = await axios.delete(`/deleteuser/${id}`)
            if (data) {
                setUserData(prevData => prevData.filter(user => user._id !== id))
            }
        }
    }

    const visible = useSelector((state) => state.crudapp.client.toggleForm)
    const dispatch = useDispatch()
    const handleEditUser = async (user) => {
        dispatch(toggleChangeAction())
        dispatch(updateAction(user))
        const { data } = await axios.get(`updateuser/${user}`)
    }

    const [query , setQuery] = useState('')
    const filteredData = userData.filter(user =>
        user.name.includes(query) ||
        user.email.includes(query) ||
        user.phone.toString().includes(query)
      );
    return (
        <>
         <div className='input-type p-6'>
                <input type="text"  placeholder='search' onChange={e => setQuery(e.target.value)} className='border px-5 py-3 focus:outline-none rounded-md' />
            </div>
            <table className='min-w-full table-auto'>
                <thead>
                    <tr className='bg-gray-800'>
                        <th className='px-16 py-2'>
                            <span className='text-gray-200'>Name</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-gray-200'>Email</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-gray-200'>Phone</span>
                        </th>
                        <th className='px-16 py-2'>
                            <span className='text-gray-200'>Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody className='bg-gray-50'>
                    {filteredData.map(user => (
                        <tr key={user._id} className='bg-grey-50 text-center'>
                            <td className='px-16 py-2 flex flex-row items-center'>
                                {/* If you have an image URL in your data, you can use it here */}
                                {/* <img src={user.imageUrl} alt={user.name} /> */}
                                <img className='h-8 w-8 rounded-full object-cover' src={user.image} alt="" />
                                <span className='text-center ml-2 font-semibold'>{user.name}</span>
                            </td>
                            <td className='px-16 py-2'>
                                <span>{user.email}</span>
                            </td>
                            <td className='px-16 py-2'>
                                <span>{user.phone}</span>
                            </td>
                            <td className='px-16 py-2 flex justify-around gap-4'>
                                <button onClick={() => handleEditUser(user)} className='cursor'><BiEdit size={25} color={"rgb(34,197,94)"} /></button>
                                <button onClick={() => handleDelete(user._id)} className='cursor'><BiTrashAlt size={25} color={"rgb(244,63,94)"} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
