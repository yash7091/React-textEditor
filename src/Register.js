import React, { useState } from 'react'
import {db, auth} from "./firebase"
import {useHistory} from 'react-router-dom';

function Register() {
    const history =useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const sbmt=(e)=>{
        e.preventDefault();

        db.collection('users').doc().set({
            email:email,
        })

        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            history.push("/Home");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    
    return (
        <div>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={sbmt}>Submit</button>
        </div>
    )
}

export default Register
