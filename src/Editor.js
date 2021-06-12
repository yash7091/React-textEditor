import React, { useEffect } from 'react'
import {db, auth} from './firebase'
import {useState} from "react"
import {useParams} from 'react-router-dom'

function Editor() {
    const [input, setInput] = useState("");
    const {id}=useParams();
    const [nm,setnm]=useState("Untitled"); 
  
    const Submit=(e)=>{
      db.collection('text').doc(id).update({
        input:input,
        owner:auth.currentUser.email,
        owner_id:auth.currentUser.uid,
      })
      setInput(e.target.value);
      console.log(" submit function")
    }
    

    const savenm=(e)=>{
      db.collection('text').doc(id).update({
        file_name:nm,
      })
      setnm(e.target.value);

    }
    useEffect(
      ()=>{
        db.collection('text').doc(id).get().then(
            (doc)=>{
              setInput(doc.data().input)
              setnm(doc.data().file_name)
              console.log("useeffect ")
            }
           
            
        )
      }
      ,[]
    )
    return (
        <div>
        <div className="App">
      <textarea class="editor__area" value={input} onChange={Submit}/>
      <input value={nm} onChange={savenm}/>
    </div>
        </div>
    )

}
export default Editor
