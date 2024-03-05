import axios from 'axios';
import React , {useState , useReducer} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'
import { BiEdit } from 'react-icons/bi';
import { logout } from '../redux/store.js'
import EditUserForm from '../components/EditUserForm.jsx';

export default function Profile() {
  const formReducer = (state, event) => {
    return {
        ...state,
        [event.target.name]: event.target.value || state[event.target.name]
    }
}
  const [formData, setFormData] = useReducer(formReducer, {})
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post('/logout')
      if (data.success) {
        toast.success('Logout Successfully')
        dispatch(logout())
        localStorage.removeItem("user");
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleEditUser = async(e) =>{
    setVisible(!visible)
  }

  
  return (
    <>
      <div className='flex justify-center mt-24'>
      {visible ? <EditUserForm /> : <></>}
      </div>
      <div className='flex justify-center mt-24'>
        <div className="max-w-xs bg-gray-50 shadow-md rounded-lg overflow-hidden">
          <div className="px-11 py-6 ">
            <button className='ml-44' onClick={handleEditUser}><BiEdit size={25} color={"rgb(34,197,94)"} /></button>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-black ">
              <img className="h-16 w-16 rounded-full object-cover" src={user.user.image} alt="" />
            </div>
            <div className="mt-4">
              <h1 className="text-lg text-center font-semibold text-gray-800">Name : {user.user.name}</h1>
              <p className="text-sm text-gray-600 mt-1 text-center">Phone Number : {user.user.phone}</p>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="text-sm text-gray-800 font-semibold">{user.user.email}</p>
              </div>
            </div>
            <div className="mt-4">
              <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">
                logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
