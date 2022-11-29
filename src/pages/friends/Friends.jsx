import axios from "../../utils/axios.js";
// //import axios from "axios";
import {useEffect, useState, useContext} from "react";
// import {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../utils/AuthContext";
 import { useNavigate } from 'react-router-dom';
 //import { useParams, useHistory } from 'react-router-dom';
  

  export default function Friends() {

//   console.log();

   const [userObject, setUserObject] = useState("");
   const[listOfAppFriends, setListOfAppFriends] = useState([]);
   const[listOfNotAppFriends, setListOfNotAppFriends] = useState([]);
  // const { authState } = useContext(AuthContext);

  //   const userId = authState.userId;
  //   console.log("Usseeeeeeeeeer",userId);
  
 let navigate = useNavigate();
// let{id} = useParams();

// useEffect(() => {
//   if (localStorage.getItem("accessToken")) {
//        axios
//       .get("api/friends/user/myFriends", {
//         headers: { accessToken: localStorage.getItem("accessToken") },
//       })
//       .then((response) => {
//         setListOfFriends(response.data.listOfFriends);
//       });
//   }
// }, []);


useEffect(() => {
    axios
      //.get(`http://localhost:8800/api/auth/user`,
      .get("api/auth/user", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response) => {
        setUserObject(response.data.user);
       // console.log("!!!!!!!!!!", response.data);
      });
      axios.get("api/friends/user/myFriends",{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response)=>{
       // console.log("Friendships++++++++++++", response.data);
          setListOfAppFriends(response.data);
      });

      axios.get("api/friends/user/notApprFriends",{
        headers: { accessToken: localStorage.getItem("accessToken") },
      }).then((response)=>{
       // console.log("Friendships++++++++++++", response.data);
          setListOfNotAppFriends(response.data);
      });

  }, []);

  
// let friendApproved = false;
// if(userObject.friendships.approvedDate==null){
//   friendApproved=true;
// }
//const today = new Date();
// console.log(today);

  const approveFriend=(id)=>{

    axios.patch("api/friends/user/approveDate", 
    {
      friend: id,
    },
    {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }).then(() => {
      navigate("/user/myFriends");
      }
    );
  }

  const deleteFriend=(id)=>{

    axios.delete(`api/friends/user/deleteFriend/${id}`, 
       {
      headers: { accessToken: localStorage.getItem("accessToken") },
    }
    // {
    //   friend: id,
    // }
    ).then(() => {
      
      navigate("/user/myFriends");
      });

  };


  //   .then(response => {
  //     if (response.data.success) {
  //         // setting the value of text area input to empty string
  //        setComment("")
  //        // update saved data into Parent component Post.jsx using props which we call refreshFunction
  //        // in the brackets we put the new comment value
  //        props.refreshFunction(response.data.result)
  //     } else {
  //         alert('Failed to save Comment')
  //     }
  // })

 

 return (
   <>
   <h2>Username: {userObject.username}</h2>
 <div> 

 <table className="table is-striped is-fullwidth">
    <thead>
        <tr>
        <th>Id</th> 
        <th>User</th> 
          {/* <th>Friend</th>     */}
       <th>Approval Date</th>
        {/*<th>Request Date</th>  */}
        
         </tr>
    </thead>
    <tbody> 
         {listOfAppFriends.map((value, key) => { 
          return ( 
                 <tr key={key} > 
                  <td>{ value._id}</td> 
                 <td>{ value.username}</td> 
                 {/* <td>{ value.friendships.approvedDate }</td> */}
                 {/* <td>{ value.friendships } </td>  */}
                {/* <td>{ value.user}</td> 
                 <td>{ value.friend }</td> 
                
                <td>{ value.requestDate }</td>  */}

{/* <td><button onClick={() => {
                      approveFriend(value._id);
                    }}> Approve
                  </button></td> */}
                
                {/* {friendApproved ?(
                <td><button onClick={() => {
                      approveFriend(value._id);
                    }}> Approve
                  </button></td>): (
                   <td></td>
                  )} */}
                <td><button onClick={() => {
                      deleteFriend(value._id);
                    }}>Delete</button></td> 

                {/* <td><button onClick={()=>{navigate(`/auction/${value.id}`);}}> Edit
                  </button></td>
                <td>Delete</td>  */}
                
                
             </tr> 
           ); 
 }) } 
         
     </tbody>
</table>



<table className="table is-striped is-fullwidth">
    <thead>
        <tr>
        <th>Id</th> 
        <th>User</th> 
          {/* <th>Friend</th>     */}
       <th>Approval Date</th>
        {/*<th>Request Date</th>  */}
        
         </tr>
    </thead>
    <tbody> 
         {listOfNotAppFriends.map((value, key) => { 
          return ( 
                 <tr key={key} > 
                  <td>{ value._id}</td> 
                 <td>{ value.username}</td> 
                 {/* <td>{ value.friendships.approvedDate }</td> */}
                 {/* <td>{ value.friendships } </td>  */}
                {/* <td>{ value.user}</td> 
                 <td>{ value.friend }</td> 
                
                <td>{ value.requestDate }</td>  */}

<td><button onClick={() => {
                      approveFriend(value._id);
                    }}> Approve
                  </button></td>
                
                {/* {friendApproved ?(
                <td><button onClick={() => {
                      approveFriend(value._id);
                    }}> Approve
                  </button></td>): (
                   <td></td>
                  )} */}
                <td><button onClick={() => {
                      deleteFriend(value._id);
                    }}>Delete</button></td> 

                {/* <td><button onClick={()=>{navigate(`/auction/${value.id}`);}}> Edit
                  </button></td>
                <td>Delete</td>  */}
                
                
             </tr> 
           ); 
 }) } 
         
     </tbody>
</table>



</div> 
</>
 );

}

//   const friends = [];

// for(let i=0; i<listOfFriends.length; i++){
//   listOfFriends[i].friendships.forEach(item=>console.log(item));
//  //friends[i]=listOfFriends[i].friendships;
// }
//console.log(friends);

//friends.forEach(item=>console.log(item));

  // console.log("User ", userObject.friendships);
  // console.log("List ", listOfFriends.friendships);

//console.log("authState userId!!!!!!!!!!!!!!!!!!!!!!", userId);

// useEffect(()=>{
//     axios.get(`api/friends/myFriends/${userId}`).then((response)=>{
//       //console.log(response);
//    console.log("Friendships++++++++++++", response.data);
//         setListOfFriends(response.data);
//     });
// }, []);

