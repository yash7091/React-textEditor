import React, { useState } from 'react'
import {auth} from './firebase'
import {useHistory} from 'react-router-dom';

function Login() {
    const history =useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const signin=(e)=>{
        e.preventDefault();

        auth.signInWithEmailAndPassword(email,password)
        .then(() => {
            history.push('/')
        })
        .catch((error)=>
            console.log(error.message)
        )
        
    }
    
    return (
        <div>    
            <input value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signin}>Submit</button>
        </div>
    )
}

export default Login
