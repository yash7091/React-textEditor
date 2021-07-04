import React, { useEffect } from 'react'
import {db} from './firebase'
import {useState} from "react"
import {useParams, Link} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext';
import './Editor.css'

function Editor() {
    const [input, setInput] = useState("");
    const {id}=useParams();
    const [nm,setnm]=useState("Untitled");
    const {currentUser}=useAuth(); 
  
    const Submit=(e)=>{
      setInput(e.target.value);
      db.collection('text').doc(id).update({
        input:input,
       
        updated_on:new Date().toString(),
      })
    }
    

    const savenm=(e)=>{
      setnm(e.target.value);
      db.collection('text').doc(id).update({
        file_name:nm,
        updated_on:new Date().toString(),
      })
      
    }

    useEffect(()=>{
        db.collection('text').doc(id).get().then((doc)=>{
          setInput(doc.data().input)
          setnm(doc.data().file_name)
        })
    },[id])

    return (
        <div className="editor">
          <div className="titlebar">
            <Link to="/"><i class="fas fa-arrow-left"></i></Link><input className="shadow p-3 rounded-pill" type="text" value={nm} onChange={savenm}/>
          </div>
          <br />
          <div className="d-flex justify-content-center">
           <textarea className="shadow-lg p-5" type="text" value={input} onChange={Submit}/>
          </div>
        </div>
    )

}
export default Editor
