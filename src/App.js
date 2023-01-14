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
  const [userID, setUserID] = useState("")
  const [allUsers, setAllUsers] = useState([])
  const [authorized, setAuthorized] = useState(false)
  const [userCred, setUserCred] = useState({})
  const [dropDown, setDropDown] = useState(true)
  const [projects, setProjects] = useState([])
  const [currentProject, setCurrentProject] = useState({})
  const [filteredProjects, setFilteredProjects] = useState([])
  const [addModal, setAddModal] = useState(false)
  const [comment, setComment] = useState([])
  const [input, setInput] = useState("")
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
  
  useEffect(() => {
    authListener();
    getAllUsers();
  }, [])
  
  const authListener = async () => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        await getUserByID(user.multiFactor.user.providerData[0].uid);
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
          if(googleUser.googleid && allUsers){
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
      }
    )
  };

  async function makeUser(person){
    try{
      const newUser = await axios.post("https://proshare-backend.herokuapp.com/api/users", person);
      setUser(newUser);
    }catch(err){
      console.log(err);
    }
  }

  async function getAllUsers(){
    try{
      const allUser = await axios.get("https://proshare-backend.herokuapp.com/api/users");
      setAllUsers(allUser.data);
    }catch(err){
      console.log(err);
    }
  }

  async function getUserByID(userid){
    try{
      const person = await axios.get(`https://proshare-backend.herokuapp.com/api/users/${userid}`);
      setUser(person.data[0]);
    }catch(err){
      console.log(err);
    }
  }

  async function getAllProjects(){
    try{
      const pjts = await axios.get("https://proshare-backend.herokuapp.com/api/projects");
      setProjects(pjts.data);
    }catch(err){
      console.log(err);
    }
  }

  const handleAddModal = () => {
    setAddModal(!addModal);
  }

  const handleDropDownModal = () => {
    setDropDown(!dropDown);
  }

  const handleAddModalSubmit = async (e) => {
    e.preventDefault();
    const allComments = currentProject.comments.map((comment) => {return(comment)})
    allComments.push(comment)
    const combinedComments = {
      _id: currentProject._id,
      comments: allComments
    }
    try{
      await axios.put(`https://proshare-backend.herokuapp.com/api/projects`, combinedComments)
    }catch(err){
      console.log(err)
    }
    await getAllProjects();
    setAddModal(!addModal);
    setCurrentProject([])
    let filter = projects.filter((project) => 
            project.title.toLowerCase().includes(input.toLowerCase())
      )
    setFilteredProjects(filter)
    setInput("")
  }

  const handleAddModalChange = async (e) => {
    setComment(e.target.value);
  }

  return (
    <div className="App">
          <Header user={user} setUser={setUser} userID={userID} setUserID={setUserID} getUserByID={getUserByID} authorized={authorized} setAuthorized={setAuthorized} userCred={userCred} handleGoogleLogin={handleGoogleLogin}/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home user={user} allUsers={allUsers} projects={projects} setProjects={setProjects} dropDown={dropDown} setDropDown={setDropDown} addModal={addModal} setAddModal={setAddModal} handleAddModal={handleAddModal} setComment={setComment} handleAddModalChange={handleAddModalChange} handleAddModalSubmit={handleAddModalSubmit} setCurrentProject={setCurrentProject}/>}/>
              <Route path="/accounts" element={<Profile userID={userID} userCred={userCred} projects={projects} setProjects={setProjects} authorized={authorized} dropDown={dropDown} handleDropDownModal={handleDropDownModal}/>}/>
              <Route path="/ide" element={<IDE/>}/>
              <Route path="/search" element={<Search allUsers={allUsers} projects={projects} setProjects={setProjects} filteredProjects={filteredProjects} setFilteredProjects={setFilteredProjects} input={input} setInput={setInput} dropDown={dropDown} setDropDown={setDropDown} addModal={addModal} setAddModal={setAddModal} handleAddModal={handleAddModal} setComment={setComment} handleAddModalChange={handleAddModalChange} handleAddModalSubmit={handleAddModalSubmit} setCurrentProject={setCurrentProject}/>}/>
            </Routes>
          </main>
    </div>
  );
}
export default App;


