import React from 'react'
import db from './firebase'
import {useState,useEffect} from "react"

function Editor() {
    const [input, setInput] = useState("");

    const Submit=(e)=>{
      db.collection('text').doc("yooooo").set({
        input:input,
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
