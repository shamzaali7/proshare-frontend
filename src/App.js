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
  const [user, setUser] = useState({
    googleid: "",
    email: "",
    name: "",
    profilePicture: ""
  })
  const [userID, setUserID] = useState("")
  const axiosUsers = {
    method: 'GET',
    url: `https://proshare-backend.herokuapp.com/api/users/${userID}`
  }
  const [authorized, setAuthorized] = useState(false)
  const [userCred, setUserCred] = useState({})
  

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      async (userCredentials)=>{
        if(userCredentials){
          setUserID(userCredentials.additionalUserInfo.profile.id);
          setAuthorized(true);
          setUserCred(userCredentials);
          getUserByID();
          setUser({
            googleid: userCredentials.additionalUserInfo.profile.id,
            email: userCredentials.additionalUserInfo.profile.email,
            name: userCredentials.additionalUserInfo.profile.name
          })
          console.log(userCredentials)
        }
      }
    )
  };

  // async function makeUser(){
  //   try{
  //     await axios.post("https://proshare-backend.herokuapp.com/api/users", User)
  //   }catch(err){
  //     console.log(err)
  //   }
  // }



  async function getUserByID(){
    try{
      await axios.request(axiosUsers)
      // setUser({
      //   googleid: res.data[0].googleid,
      //   email: res.data[0].email,
      //   name: res.data[0].name,
      //   profilePicture: res.data[0].profilePicture
      // })
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="App">
          <Header user={user} authorized={authorized} setAuthorized={setAuthorized} userCred={userCred} handleGoogleLogin={handleGoogleLogin}/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/accounts" element={<Profile userID={userID} userCred={userCred}/>}/>
              <Route path="/ide" element={<IDE/>}/>
              <Route path="/search" element={<Search/>}/>
            </Routes>
          </main>
    </div>
  );
}
export default App;
