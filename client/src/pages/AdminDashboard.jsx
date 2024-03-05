import React, { useState } from 'react'
import { BiUserPlus } from 'react-icons/bi'
import Table from '../components/Table'
import Form from '../components/Form'
import {  useDispatch, useSelector } from 'react-redux'
import { toggleChangeAction , updateAction } from '../redux/store'

export default function AdminDashboard() {
  const visible = useSelector((state) => state.crudapp.client.toggleForm)
  const dispatch = useDispatch()
  const handleToggle = () => {
    dispatch(toggleChangeAction())
    dispatch(updateAction(undefined))
  }
  return (
    <main className='py-5'>
      <h1 className='text-xl md:text-5xl text-center font-bold py-10'>User Management</h1>
      <div className="container mx-auto flex justify-between py-5 border-b">
        <div className='left flex gap-3'>
          <button className='flex bg-black text-white px-4 py-2 border rounded hover:bg-slate-900 hover:text-white' onClick={handleToggle}>
            Add Employee <span className='px-1'><BiUserPlus size={25}></BiUserPlus></span>
          </button>
        </div>
      </div>
      {visible ? <Form /> : <></>}
      <div className='container mx-auto'>
        <Table />
      </div>
    </main>
  )
}
