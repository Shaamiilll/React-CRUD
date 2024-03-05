import React from 'react';
import Adduser from './Adduser';
import UpdateUser from './UpdateUser';
import { useState } from 'react';
import { useSelector } from 'react-redux';


export default function Form() {
 
    const formId = useSelector((state)=>state.crudapp.client.formId)
    return (
        <div className="container mx-auto py-5">
        {formId ?<UpdateUser/>: <Adduser/>  }
        </div> 
    )
}
