import React, { useEffect, useState, useContext } from "react";
import axios from "../../utils/axios";
import { useParams } from "react-router";
import "../register/register.css";
import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Topbar from "../../components/topbar/Topbar.jsx";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import "./myProfile.css"
import TextArea from "rc-textarea";
import { BlobServiceClient } from "@azure/storage-blob";




export default function MyProfile() {
  let navigate = useNavigate();
  const [user, setUser] = useState({});

  const { userId } = useParams();

  // const { authState } = useContext(AuthContext);
  // const userId= authState.userId;

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState("");
  const [avatarURL, setAvatarURL] = useState(null);
  const [city, setCity] = useState();
  const [from, setFrom] = useState();
  const [birthday, setBirthday] = useState();
  const [desc, setDesc] = useState();




  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users?userId=${userId}`);
      setUsername(res.data.username);
      setCity(res.data.city);
      setFrom(res.data.from);
      setBirthday(res.data.birthday);
      setDesc(res.data.desc);
      setPassword(res.data.password);
      setAvatarURL(res.data.avatarURL);
      //console.log(res)
      setUser(res.data);
    };
    //console.log("User in useEffect :", user);
    //window.location.reload();
    fetchUser();
  }, [userId]);




    // all blobs in container
    const [blobList, setBlobList] = useState([]);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState([]);
    const [filePreview, setFilePreview] = useState(null);
    const onFileChange = (event) => {
      // capture file into state
      setFileSelected(event.target.files);
      setFilePreview(URL.createObjectURL(event.target.files[0]));
    };
  
    const formData = new FormData()
    
    
    formData.append("fileName", fileSelected[0])

    formData.append('username', username);
    formData.append('city', city);
    formData.append('from', from);
    formData.append('birthday', birthday);
    formData.append('desc', desc);
    formData.append('avatarURL', avatarURL);

// const getavatarurl =(data)  => {
    
//   //set azure environment : ConnectionString and ContainerName
//   const blobServiceClient = BlobServiceClient.fromConnectionString(
//     "BlobEndpoint=https://tickle.blob.core.windows.net/;QueueEndpoint=https://tickle.queue.core.windows.net/;FileEndpoint=https://tickle.file.core.windows.net/;TableEndpoint=https://tickle.table.core.windows.net/;SharedAccessSignature=sv=2021-06-08&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2022-12-23T10:48:40Z&st=2022-11-23T02:48:40Z&spr=https&sig=0n%2Bq%2FYphSP%2BSzLnv8v1VgCJDSHYjuS0X8VsGf8k23eE%3D"
//   );
//   const containerClient = blobServiceClient.getContainerClient("post");

//   const fileName = data.fileName;
//   const blockBlobClient = containerClient.getBlockBlobClient(fileName);
//   const options = { blobHTTPHeaders: { blobContentType: data.fileName.type } };
//   blockBlobClient.uploadData(data.fileName.data, options);

//   const avatarURL = containerClient.getBlockBlobClient(fileName).url;

//   return avatarURL;
// }


   

    // formData.append('avatarURL', "");

  const updateMyInfo = (userId) => {

    // avatarURL= getavatarurl(formData);
    axios
      .patch(
        `users/update/${userId}`,
        formData,
        // {
        //   // role: role.current,
        //   // avatarURL: avatarURL,
        //   username: username,
        //   //email: email,
        //   //  password: password.current,
        //   city: city,
        //   from: from,
        //   birthday: birthday,
        //   desc: desc,
        // },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        setUser(response.data);
        window.location.reload();
        navigate("/");
      });
  };

  const deleteMyAccount = (userId) => {
    axios
      .delete(`users/delete/${userId}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        navigate("/");
      });
  };
  return (
    <>
    <Topbar/>
    <div className="homeContainer">
    <Sidebar/>
    <div className="myProfileContainer">
    <div className="photoTop">
          <div className="photoRight">
            <h3 className="friendTitle">Edit profile</h3>
          </div>
            <div className="photoLeft">
            <button type="button" className="myprofileLeftButton" onClick={() => {
                        deleteMyAccount(userId);
                      }}><DeleteForeverOutlinedIcon className="myProfileIcon"/>Delete profile </button>
            </div>
        </div>
    <hr></hr>
    <div className="profileItems">

                <Formik>
                  <Form className="myProfileForm">
                      <div>
                      {/* .....................upload avatar........................ */}
                      {filePreview!== null ?  
                      <img
                        src={filePreview }
                        alt=""
                        className=""
                      />: avatarURL !== null ? 
                      <img
                        src={avatarURL }
                        alt=""
                        className=""
                      /> : null }
                      
                      <input type="file"  accept="image/jpeg, image/png, image/jpg"  onChange={onFileChange} />
       
                      <Field
                        className="loginInput"
                        name="avatarURL"
                        placeholder="avatarURL"
                        hidden
                      />
                    </div>


                    <span className="myProfileSpan">User name: </span>
                    <div>
                        
                      <ErrorMessage
                        className="RegisterError"
                        name="username"
                        component="span"
                      />
                      <Field
                        className="myProfileInput"
                        name="username"
                        placeholder="User name"
                        value={username}
                        onChange={(event) => {
                          setUsername(event.target.value);
                        }}
                      />
                    </div>
<span className="myProfileSpan" >City</span>
                    
                    <div>
                 

                      <Field
                        className="myProfileInput"
                        name="city"
                        placeholder="City"
                        value={city}
                        onChange={(event) => {
                          setCity(event.target.value);
                        }}
                      />
                    </div>
                    
                    
<span className="myProfileSpan">From</span>

                    <div>
                      <ErrorMessage
                        className="RegisterError"
                        name="from"
                        component="span"
                      />
                      <Field
                        className="myProfileInput"
                        name="from"
                        placeholder="From"
                        value={from}
                        onChange={(event) => {
                          setFrom(event.target.value);
                        }}
                      />
                    </div>
<span className="myProfileSpan">Birthday</span>
                    <div>
                      <ErrorMessage
                        className="RegisterError"
                        name="birthday"
                        component="span"
                      />
                      <Field
                        className="myProfileInput"
                        name="birthday"
                        placeholder="Birthday"
                        value={birthday}
                        onChange={(event) => {
                          setBirthday(event.target.value);
                        }}
                      />
                    </div>
                    <span className="myProfileSpan">About myself</span>
                    <div>
                      <ErrorMessage
                        className="RegisterError"
                        name="desc"
                        component="span"
                      />
                      <TextArea
                        className="myProfileTextarea"
                        name="desc"
                        placeholder="Tell us about yourself..."
                        value={desc}
                        onChange={(event) => {
                          setDesc(event.target.value);
                        }}
                      />
                    </div>
                    
                    <button className="updateButton"
                      onClick={() => {
                        updateMyInfo(userId);
                      }}
                    >
                      Update
                    </button>
                  
                    {/* <button type="submit" className="loginRegisterButton">
                  Sign Up
                </button> */}
                    {/* <button type="submit" className="loginButton">
                      Log into Account
                    </button> */}
                  </Form>
                </Formik>
              </div>
      

        {/*  */}
      </div>
      </div>
    </>
  );
}
