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
  const [dropDown, setDropDown] = useState(true)
  const [user, setUser] = useState({
    _id: "",
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
  const [addModal, setAddModal] = useState(false)
  
  useEffect(() => {
    authListener();
    getAllUsers()
  }, [])
  
  const authListener = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getUserByID(user.multiFactor.user.providerData[0].uid);
        setGoogleUser({
          googleid: user.multiFactor.user.providerData[0].uid,
          email: user.multiFactor.user.email,
          name: user.multiFactor.user.displayName,
        })
        setUserID(user.multiFactor.user.providerData[0].uid)
      }
    })
    await getAllUsers()
  }

  const handleGoogleLogin = async () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      async (userCredentials) => {
        if(userCredentials){
          setAuthorized(true);
          await getUserByID()
          setUserCred(userCredentials);
          let count = allUsers.length;
          allUsers.map((currentUser) => {
            if(googleUser.googleid === currentUser.googleid){
              setUser({
                _id: currentUser._id,
                googleid: currentUser.googleid,
                email: currentUser.email,
                name: currentUser.name,
                profilePicture: currentUser.profilePicture,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
              })
            }else{
              count--
            }
            if(count === 0){
              makeUser({
                googleid: userCredentials.additionalUserInfo.profile.id,
                email: userCredentials.additionalUserInfo.profile.email,
                name: userCredentials.additionalUserInfo.profile.name,
                firstName: userCredentials.additionalUserInfo.profile.given_name,
                lastName: userCredentials.additionalUserInfo.profile.family_name
              });
            }
          })
        }
      }
    )
  };

  async function makeUser(person){
    try{
      const newUser = await axios.post("https://proshare-backend.herokuapp.com/api/users", person)
      console.log(newUser)
      setUser(newUser)
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

  async function getUserByID(userid){
    try{
      const person = await axios.get(`https://proshare-backend.herokuapp.com/api/users/${userid}`)
      setUser(person.data[0])
    }catch(err){
      console.log(err)
    }
  }

  const handleAddModal = () => {
    setAddModal(!addModal)
  }

  const handleDropDownModal = () => {
    setDropDown(!dropDown)
  }

  const handleAddModalSubmit = async (e) => {
    e.preventDefault();
    // try{

    // }catch(err){
    //   console.log(err)
    // }
    setAddModal(!addModal)
  }

  return (
    <div className="App">
          <Header user={user} setUser={setUser} userID={userID} setUserID={setUserID} getUserByID={getUserByID} authorized={authorized} setAuthorized={setAuthorized} userCred={userCred} handleGoogleLogin={handleGoogleLogin}/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home user={user} allUsers={allUsers} dropDown={dropDown} setDropDown={setDropDown} addModal={addModal} setAddModal={setAddModal} handleAddModal={handleAddModal} handleAddModalSubmit={handleAddModalSubmit}/>}/>
              <Route path="/accounts" element={<Profile userID={userID} userCred={userCred} authorized={authorized} dropDown={dropDown} handleDropDownModal={handleDropDownModal}/>}/>
              <Route path="/ide" element={<IDE/>}/>
              <Route path="/search" element={<Search dropDown={dropDown} setDropDown={setDropDown} allUsers={allUsers} addModal={addModal} setAddModal={setAddModal} handleAddModal={handleAddModal} handleAddModalSubmit={handleAddModalSubmit}/>}/>
            </Routes>
          </main>
    </div>
  );
}
export default App;


