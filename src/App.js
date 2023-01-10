import {useState, React, useEffect} from 'react'
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
  let [countUser, setCountUser] = useState(0)
  const [user, setUser] = useState({
    googleid: "",
    email: "",
    name: "",
    profilePicture: "",
    firstName: "",
    lastName: ""
  })
  const [googleUser, setGoogleUser] = useState({
    googleid: "",
    email: "",
    name: "",
    firstName: "",
    lastName: ""
  })
  const [userID, setUserID] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [authorized, setAuthorized] = useState(false)
  const [userCred, setUserCred] = useState({})
  const axiosUsers = {
    method: 'GET',
    url: `https://proshare-backend.herokuapp.com/api/users/${userID}`
  }
  
  useEffect(() => {
    authListener();
  }, [])
  
  const authListener = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setGoogleUser({
          googleid: user.multiFactor.user.providerData[0].uid,
          email: user.multiFactor.user.email,
          name: user.multiFactor.user.displayName,
        })
      }
    })
    await getAllUsers()
  }

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      async (userCredentials) => {
        if(userCredentials){
          setUserID(userCredentials.additionalUserInfo.profile.id);
          setAuthorized(true);
          setUserCred(userCredentials);
          getUserByID();
          allUsers.map((currentUser) => {
            if(googleUser.email == currentUser.email){
              setCountUser(countUser++);
              setUser({
                googleid: currentUser.googleid,
                email: currentUser.email,
                name: currentUser.name,
                profilePicture: currentUser.profilePicture,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
              })
            }
          })
          if((countUser == 0)){
            await makeUser({
              googleid: userCredentials.additionalUserInfo.profile.id,
              email: userCredentials.additionalUserInfo.profile.email,
              name: userCredentials.additionalUserInfo.profile.name,
              firstName: userCredentials.additionalUserInfo.profile.given_name,
              lastName: userCredentials.additionalUserInfo.profile.family_name
            });
          }
        }
      }
    )
  };

  async function makeUser(person){
    try{
      const newUser = await axios.post("https://proshare-backend.herokuapp.com/api/users", person)
      console.log(newUser)
    }catch(err){
      console.log(err)
    }
  }

  async function getAllUsers(){
    try{
      const allUser = await axios.get("https://proshare-backend.herokuapp.com/api/users")
      setAllUsers(allUser.data)
    }catch(err){
      console.log(err)
    }
  }

  async function getUserByID(){
    try{
      await axios.request(axiosUsers)
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
              <Route path="/accounts" element={<Profile userID={userID} userCred={userCred} authorized={authorized}/>}/>
              <Route path="/ide" element={<IDE/>}/>
              <Route path="/search" element={<Search/>}/>
            </Routes>
          </main>
    </div>
  );
}
export default App;


