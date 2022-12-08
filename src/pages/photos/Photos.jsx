import axios from "../../utils/axios.js";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import { useContext } from "react";
import { AuthContext } from "../../utils/AuthContext.js";
import { useParams } from "react-router-dom";
import "./photo.css"

export default function Photos() {
  let navigate = useNavigate();
  const [photoList, setPhotoList] = useState([]);
  const [albumList, setAlbumList] = useState([]);
  const [show, setShow] = useState(false);
  const [album, setAlbum] = useState([]);
  const [idList,setIdList] = useState([]);
  // const { authState } = useContext(AuthContext);
  // const { id } = useParams();
  // const  id  = authState.userId;
  
  useEffect(() => {
    axios
      //.http://localhost:8800/api/photos/myphoto/`,
        .get(`api/photos/myphoto/`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setPhotoList(response.data);
      });
      axios
      //http://localhost:8800/api/photos/getalbums
        .get(`api/photos/getalbums/`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setAlbumList(response.data);
      });
  }, []);




  
const updatePhotos=()=>{
  axios.patch(`api/photos/updatephotos/`, {
      album: album,
      idList: idList
  },
  {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
  ).then((response) => {
    
      // window.location.reload();

    });
}
  
// const addToIdList =()=>{
  // if(this.checked==true){
  //   idList.push(this.value)
  // }else{
  //   idList.filter(e=>e!== this.value)
  // }
//   const e = document.getElementById("box");
//     this.setIdList(...idList, e.target.value);
// }

// async function deleteBlob(containerClient, blobName){

//   const options = {
//     deleteSnapshots: 'include' // or 'only'
//   }

//   // Create blob client from container client
//   const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

//   await blockBlobClient.delete(options);

//   console.log(`deleted blob ${blobName}`);

// }


  return (
    <>
    <Topbar/>
    <div className="homeContainer">
    <Sidebar/>
      {/* friendContainer should be changed to photoContainer */}
      <div className="photoContainer">
        <div className="photoTop">
          <div className="photoRight">
          <h3 className="photoTitle">My Photos</h3>
          </div>
          <div className="photoLeft">
          <button type="button" className="photoEditButton" onClick={()=>setShow(!show)}>Edit</button>
          <button type="button" className="photoEditButton" onClick={()=>setShow(!show)}>Move to</button>
          </div>
        
        
        </div>
      
      <div className="photoItems">
        {albumList.map((value, key) => {
          return (
            <li>
              <div className="photoItem"
              onClick={() => {
                if (value=='Albums') {
                  axios
                    //.http://localhost:8800/api/photos/myphoto/`,
                      .get(`api/photos/myphoto/`, {
                      headers: { accessToken: localStorage.getItem("accessToken") },
                    }).then((response) => {
                      setPhotoList(response.data);
                    });
                  
                }else{
                    axios
                      // Get photos by album name
                      //http://localhost:8800/api/photos/getphotobyalbum/:album
                      .get(`api/photos/getphotobyalbum/${value}`, {
                      headers: { accessToken: localStorage.getItem("accessToken") },
                    }).then((response) => {
                      setPhotoList(response.data);
                    });
                }
                
                }}>
                  <button className="photoButton">{value}</button>
                
              </div>
              </li>
              
            ); })}
            
</div>
<hr className="photoHr"></hr>
            {show && <div>
            <label >Move to list:</label>
            <input  type="text" className ="form-control" 
                                    onChange={(event) => {setAlbum(event.target.value);}
                                }/>
              <button type="submit" onClick={()=>{updatePhotos();navigate(0);} }>submit</button>                   
                                
                                </div>
                                
                                }

 
<div className="photoGrid">
          {photoList.map((value, key) => {
            
              return (
               <div className="photoGridItem">
                 
                  {show && <input id={value._id} type="checkbox" value={value._id} 
                  //  onChange={this.addToIdList}
                   onChange={() => {
                    const event = document.getElementById(value._id);
                    // this.setIdList(...idList, e.target.value);
                    if(event.checked==true){
                      idList.push(event.value)
                    }else{
                      idList.filter(e=>e!=event.value)
                    }
                  }}
                  />}
           
                  
                    <img 
                   className="photoImg"
                      src={value.photoURL}
                    />
                      {/* </div> */}
                    {/* </li> */}
                 
                </div>
              );
          
            
          })}
          {/* </div> */}
        </div>
    {/* //  </div>  */}
    </div>
    </div>
    </>
);
}

