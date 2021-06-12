import React from 'react'
import {db, auth} from './firebase'
import {useState} from "react"
import {useParams} from 'react-router-dom'

function Editor() {
    const [input, setInput] = useState("");
    const {id}=useParams();
   
  
    const Submit=(e)=>{
      db.collection('text').doc(id).set({
        input:input,
        owner:auth.currentUser.email,
        owner_id:auth.currentUser.uid,
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
