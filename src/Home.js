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
            created_on:new Date().toString(),
            updated_on:new Date().toString(),
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
                        console.log(doc.id)
                        temp.push([doc.id,doc.data()]);
                    });
                    setdocs(temp);
            }).catch(error=>{
                console.log(error.code, error.message);
            })
    },[currentUser])

    const clickbtn=(e)=>{
        e.preventDefault();
        console.log(e.target.value);
        history.push('/'+e.target.value);  
        
    }

    return (
        <div className="home">
            <button onClick={newfile}>New file</button>
            <div className="row g-lg-2" >
            {docs.map((doc)=>{
                    return (
                        <div className="column col-md-6 col-lg-4  p-2  ">
                            <div className="h-100 w-100 shadow-lg card_row">
                            <button className="h-100 w-100 btn " value={doc[0]} onClick={clickbtn}>
                                <h5>    
                                    {doc[1].file_name}
                                </h5>
                                {/* <p>{doc[1].created_on}</p>
                                <p>{doc[1].updated_on}</p> */}
                            </button>
                            </div>
                        </div>
                    )
            })}
            </div>
        </div>
    )
}

export default Home
