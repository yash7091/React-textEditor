import React from 'react'
import {useHistory} from 'react-router-dom';
import  firebaseapp from './firebase'

function Home() {
    const history =useHistory();
    const newfile=()=>{ 
        firebaseapp.firestore().collection('text').add({}).then(
           (ref)=>{
               console.log(ref.id)
                history.push('/'+ref.id)

           }

        )
        
    }
    return (
        <div>
            <button onClick={newfile}>New file</button>
        </div>
    )
}

export default Home
