import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom';
import  {db, auth} from './firebase'
import {useAuth} from './contexts/AuthContext';
import './Home.css'

function Home() {
    const history =useHistory();
    const [docs,setdocs]=useState([]);
    const {currentUser}=useAuth(); 
    const [toggle,setToggle]=useState(false)


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

    const clickbtn=(url)=>{
        if(!url)
            return;
        history.push('/'+url);  
    }
    const calculateTime=(date,status)=>{
        console.log(date);
            const ld=date.split(" ");
            const cd = new Date().toString().split(" ");

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
    const deleteme=(e)=>{
                    console.log("inside delte")

        const id = e.target.parentNode.parentNode.value;
        console.log(id)

        if(!id)
            return;
         db.collection('text').doc(id).update(
                {
                    
                    isDeleted:true,
                }
            )

        }
    return (
        <div className="home">
            {/* <button onClick={newfile}>New file</button> */}
            <div className="row g-lg-2" >
            {docs.map((doc)=>{
                    return (
                        <div className="column col-md-6 col-lg-4  p-3  ">
                            <div className="h-100 w-100 shadow-lg p-4 card_row">
                            <button className="h-100 w-100 btn " value={doc[0]} onClick={(e)=>{clickbtn(e.target.value)}}>
                               <div className="card__header">
                                    <h5>    
                                        {doc[1].file_name}
                                    </h5>
                                    <button onClick={deleteme} > 
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                                <br/>
                                <div class="card__footer">
                                 <p>{calculateTime(doc[1].created_on,"Created ")}</p>
                                <p>{calculateTime(doc[1].updated_on,"Updated ")}</p>
                                </div>    
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
