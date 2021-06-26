import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import  {db, auth} from './firebase'
import {useAuth} from './contexts/AuthContext';
import './Home.css'
function Home() {
    const history =useHistory();
    const {currentUser}=useAuth();
    const [docs,setdocs]=useState([]);

    const newfile=()=>{ 
        db.collection('text').add({
            input:"",
            file_name:"Untitled",
        }).then((ref)=>{
                history.push('/'+ref.id)
        }).catch(error=>{
            console.log(error.code, error.message);
        })  
    }

    useEffect(()=>{
            db.collection('text').where("owner",'==',currentUser.email ).get().then(
                (querySnapshot) => {
                    let temp=[]
                    querySnapshot.forEach((doc) => {
                        temp.push([doc.id,doc.data()]);
                    });
                    setdocs(temp);
            }).catch(error=>{
                console.log(error.code, error.message);
            })
    },[currentUser])

    const clickbtn=(e)=>{
        e.preventDefault();
        history.push('/'+e.target.value);  
    }

    return (
        <div className="home">
            <button onClick={newfile}>New file</button>
            {docs.map((doc)=>{
                    return <button value={doc[0]} onClick={clickbtn}>{doc[1].file_name}</button>
            })}
        </div>
    )
}

export default Home
