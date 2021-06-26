import React, { useState } from 'react'
import {auth} from './firebase'
import {useHistory, Link} from 'react-router-dom';
import './Login.css'

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
    
    return (<div className="vh-100 vw-100 login">
            <div className="row g-0 h-100">
                <div className="bg col-lg-6 h-100">
                
                </div>
                <div className="col-lg-6 login-panel h-100">
                    <Link to="/register">Sign Up</Link>    
                    <h2>Sign In</h2>
                    <div><i class="fab fa-google"></i><i class="fab fa-facebook-f"></i></div>
                    <label>Email</label>
                    <input className="form-control w-50 me-4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input className="form-control w-50 me-4" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <button onClick={signin}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Login
