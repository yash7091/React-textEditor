import React, { useState } from 'react'
import {db} from "./firebase"
import {useHistory} from 'react-router-dom';
import firebase from "firebase"

function Landing() {
    const history =useHistory();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const sbmt=(e)=>{
        e.preventDefault();
        db.collection('users').doc().set({

            email:email,
            
            // timestamp:firebase.firestore.FieldValue.serverTimestamp()
          })
            firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in 
        history.push("/Home");
        console.log("done")
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
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

export default Landing
