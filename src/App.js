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
          setAuthorized(true);
          setUserCred(userCredentials);
          getUserByID();
        }
      }
    )
  };

  async function getUserByID(){
    await axios.request(axiosUsers)
      .then(function(res){
        setUser({
          googleid: res.data[0].googleid,
          email: res.data[0].email,
          name: res.data[0].name,
          profilePicture: res.data[0].profilePicture
        })
      }).catch((err) => {console.log(err)})
  }

  return (
    <div className="App">
      {!authorized ? 
        <div className="box-signin">
          <button className="hover:bg-slate-500 ... rounded-full ... text-base ... py-1 ... px-2" onClick={handleGoogleLogin}>
            Login with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
          </button> 
        </div>
      :
        <div>
          <Header userID={userID} user={user} authorized={authorized} setAuthorized={setAuthorized} userCred={userCred}/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home userCred={userCred}/>}/>
              <Route path="/accounts/:id" element={<Profile userID={userID} userCred={userCred}/>}/>
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
