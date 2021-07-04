import React from 'react'
import './Navbar.css'
import {Link, useHistory} from 'react-router-dom'
import {db, auth} from './firebase'
import {useAuth} from './contexts/AuthContext';

function Navbar() {
    const history=useHistory()
    const {currentUser}=useAuth(); 

    const newfile=()=>{ 
        db.collection('text').add({
            input:"",
            file_name:"Untitled",
            owner:currentUser.email,
        owner_id:currentUser.uid,
            created_on:new Date().toString(),
            updated_on:new Date().toString(),

        }).then((ref)=>{
                history.push('/'+ref.id)
        }).catch(error=>{
            console.log(error.code, error.message);
        })  
    }
    const logout=(e)=>{
        e.preventDefault();
        auth.signOut().then(()=>{
            history.push("/login");
        })
    }


    return (
        <navbar>
            <img src="Assets/layers.png" alt="brand" width="50px" />
            <Link to="/"><i class="fas fa-home-lg-alt fa-2x"></i></Link>
            <button className='btn' onClick={newfile}><i class="fas fa-plus fa-2x"></i></button>
            <Link><i class="fas fa-trash fa-2x"></i></Link>
            <Link><i class="fal fa-user-circle fa-2x"></i></Link>
            <button className='btn'><i class="fas fa-sun fa-2x"></i></button>
            <button className="btn" onClick={logout}><i class="fal fa-sign-out-alt"></i></button>
        </navbar>
    )
}

export default Navbar
