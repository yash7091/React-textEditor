import React, { useEffect } from 'react'
import {db} from './firebase'
import {useState} from "react"
import {useParams} from 'react-router-dom'
import { useAuth } from './contexts/AuthContext';

function Editor() {
    const [input, setInput] = useState("");
    const {id}=useParams();
    const [nm,setnm]=useState("Untitled");
    const {currentUser}=useAuth(); 
  
    const Submit=(e)=>{
      setInput(e.target.value);
      db.collection('text').doc(id).update({
        input:input,
        owner:currentUser.email,
        owner_id:currentUser.uid,
      })
    }
    

    const savenm=(e)=>{
      db.collection('text').doc(id).update({
        file_name:nm,
      })
      setnm(e.target.value);
    }

    useEffect(()=>{
        db.collection('text').doc(id).get().then((doc)=>{
          setInput(doc.data().input)
          setnm(doc.data().file_name)
        })
    },[id])

    return (
        <div>
        <div className="App">
          <textarea type="text" class="editor__area" value={input} onChange={Submit}/>
          <input type="text" value={nm} onChange={savenm}/>
        </div>
        </div>
    )

}
export default Editor
