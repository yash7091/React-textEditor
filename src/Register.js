import React, { useState } from 'react'
import {db, auth} from "./firebase"
import {useHistory, Link} from 'react-router-dom';

function Register() {
    const history =useHistory();
    const [name, setname] = useState("")
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const sbmt=(e)=>{
        e.preventDefault();

        db.collection('users').doc().set({
            name:name,
            email:email,
        })

        auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            history.push("/");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }
    
    return (<div className="vh-100 vw-100 login">
        <div className="row g-0 h-100">
            <div className="bg col-lg-6 h-100">
            
            </div>
            <div className="col-lg-6 login-panel h-100">
                <Link to="/login">Sign Up</Link>    
                <h2>Sign Up</h2>
                <div><i class="fab fa-google"></i><i class="fab fa-facebook-f"></i></div>
                <label>Name</label>
                <input className="form-control w-50 me-4" value={name} onChange={(e)=>setname(e.target.value)}/>
                <label>Email</label>
                <input className="form-control w-50 me-4" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <label>Password</label>
                <input className="form-control w-50 me-4" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={sbmt}>Submit</button>
            </div>
        </div>
    </div>
    )
}

export default Register
