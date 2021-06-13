import React from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {db} from './firebase'

function Navbar() {
    const history=useHistory()
    const newfile=()=>{ 
        db.collection('text').add({
            input:"",
            file_name:"Untitled",
        }).then((ref)=>{
                history.push('/'+ref.id)
        }).catch(error=>{
            console.log(error.code, error.message);
        })  
    }

    return (
        <navbar>
            <img src="Assets/layers.png" alt="brand" width="60%" />
            <Link to="/"><i class="fas fa-home-lg-alt fa-2x"></i></Link>
            <button className='btn' onClick={newfile}><i class="fas fa-plus fa-2x"></i></button>
            <Link><i class="fas fa-trash fa-2x"></i></Link>
            <Link><i class="fal fa-user-circle fa-2x"></i></Link>
            <button className='btn'><i class="fas fa-sun fa-2x"></i></button>
        </navbar>
    )
}

export default Navbar
