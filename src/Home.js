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
    const calculateTime=(date,status)=>{
        console.log(date);
            const ld=date.split(" ");
            const cd = new Date().toString().split(" ");
            
            
            //years >1 updated few years ago 
            
            
            // year differece<1 
                // months -1 updated last month
                // months <1 
                    //days difference >7 --- few weeks ago 
                    //days differe <7---
                        // 1--7 days ago 
                        // hourse ago 
                            // hrs <1  ---mins 
                            // x hrs ago 
                //>1 difference months ago  

                   

                if(cd[3]-ld[3]==1)
                {
                    return status+" last years . ";   
                }
                if(cd[3]-ld[3]>1)
                {
                    return status+" few years ago. ";   
                }
                else{
                    if(cd[1]==ld[1])
                    {
                        if(cd[2]-ld[2]>7)
                        {
                            return status +"few weeeks ago";
                        }
                        if(cd[2]-ld[2]==7)
                        {
                            return status +"last weeek ";
                        }
                        else{
                            if(cd[2]-ld[2]==1)
                            {
                                return status +"yesterday";
                            }
                            if(cd[2]-ld[2]>1)
                            {
                                return status+" " +(cd[2]-ld[2])+" days ago";
                            }
                            else{
                                const ch = cd[4].split(":")[0];
                                const lh = ld[4].split(":")[0];
                                if(ch-lh>1)
                                {
                                    return status+" "+(ch-lh)+" hours ago";
                                }
                                if(ch-lh==1)
                                {
                                    return status+"last hours";
                                }
                                else{
                                    const cm = cd[4].split(":")[1];
                                    const lm = ld[4].split(":")[1];
                                    if(cm-lm>1)
                                        return status+(cm-lm)+" mins ago";
                                    else 
                                        return status + " few secs ago "
                                }

                            }
                        }
                    }
                    else 
                    {
                        return status+" few months ago";
                    }

                }

           
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
{                                console.log(doc[1].created_on)


}                               


                                 <p>{calculateTime(doc[1].created_on,"Created :")}</p>
                                <p>{calculateTime(doc[1].updated_on,"Updated :")}</p>

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
