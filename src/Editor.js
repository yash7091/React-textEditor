import React from 'react'
import {db} from './firebase'
import {useState,useEffect} from "react"
import {useParams} from 'react-router-dom'
import firebase from "firebase"

function Editor() {
    const [input, setInput] = useState("");
    const {id}=useParams();
   
  
    const Submit=(e)=>{
      db.collection('text').doc(id).set({
        input:input,
        owner:firebase.auth().currentUser.email,
        owner_id:firebase.auth().currentUser.uid,

        // timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })
      setInput(e.target.value);
    }
  
    return (
        <div>
        <div className="App">
      <textarea class="editor__area" value={input} onChange={Submit}/>
    </div>
        </div>
    )

}
export default Editor
