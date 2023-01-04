import {useState, React} from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Profile from './Components/Profile';
import IDE from './Components/IDE';
import axios from 'axios';
import Search from './Components/Search';

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [userID, setUserID] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [userCred, setUserCred] = useState({})
  const [user, setUser] = useState({
    googleid: "",
    email: "",
    name: "",
    profilePicture: ""
  })
  const axiosUsers = {
    method: 'GET',
    url: `https://proshare-backend.herokuapp.com/api/users/${userID}`
  }

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      async (userCredentials)=>{
        if(userCredentials){
          setUserID(userCredentials.additionalUserInfo.profile.id);
          setUserEmail(userCredentials.additionalUserInfo.profile.email);
          setUserName(userCredentials.additionalUserInfo.profile.name);
          setAuthorized(true);
          setUserCred(userCredentials);
          getUserByID();
        }
      }
    )
  };
  async function createUser(){
    const newUser = {
      googleid: userID,
      email: userEmail,
      name: userName
    }
    const createAxiosUser = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      url: "https://proshare-backend.herokuapp.com/api/users/",
      body: JSON.stringify(newUser)
    }
    await axios.request(createAxiosUser)
      .then((res) => {
        getUserByID()
        console.log(res)
      })
      .then(err => {console.log(err)})
  }

  async function getUserByID(){
    await axios.request(axiosUsers)
      .then(function(res){
        setUser({
          googleid: res.data[0].googleid,
          email: res.data[0].email,
          name: res.data[0].name,
          profilePicture: res.data[0].profilePicture
        })
      }).then((err) => {console.log(err)})
  }
  // function checkID(){
  //   const axiosUserGet = {
  //     method: 'GET',
  //     url: "https://proshare-backend.herokuapp.com/api/users/"
  //   }
  //   axios.request(axiosUserGet)
  //     .then((res) => {
  //       console.log(res)
  //       let counter = 0;
  //       res.data.map(user => {
  //         if(user.googleid == userID){
  //           counter++;
  //         }
  //       })
  //       if(counter > 0){
  //         getUserByID()
  //       }else{
  //         createUser()
  //         getUserByID()
  //       }
  //     })
  // }

  return (
    <div className="App">
      {!authorized ? 
        <div className="box-signin">
          <button className="bg-sky-500 hover:bg-sky-700 ... rounded-full ... text-base ... py-1 ... px-2" onClick={handleGoogleLogin}>
            Login with Google
          </button> 
        </div>
      :
        <div>
          <Header userID={userID} userCred={userCred} user={user}/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/accounts/:id" element={<Profile userID={userID}/>}/>
              <Route path="/ide" element={<IDE/>}/>
              <Route path="/search" element={<Search/>}/>
            </Routes>
          </main>
        </div>
      }
    </div>
      
  );
}

export default App;


// const CLIENT_ID = "6539597b82efe5bb73ba";
/* <button onClick={handleGithubLogin}>Login with Github</button> */
// const [renderAgain, setRenderAgain] = useState(false);

// const handleGithubLogin = () => {
//   window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
// };

// useEffect(() => {
//   const query = window.location.search;
//   const urlParam = new URLSearchParams(query);
//   const code = urlParam.get("code");
//   console.log(code);

//   if(code && (localStorage.getItem("accessToken") === null)){
//     async function getAccessToken(){
//       await fetch("http://localhost:4000/getAccessToken?code=" + code, {
//         method: "GET"
//       }).then((response) => {
//         return response.json()
//       }).then((data) => {
//         console.log(data)
//         if(data.access_token){
//           localStorage.setItem("accessToken", data.access_token);
//           setRenderAgain(!renderAgain);
//         }
//       })
//     }
//     getAccessToken();
//   }
// },[]);