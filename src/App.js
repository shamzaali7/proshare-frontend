import {useState, React} from 'react'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Routes, Route} from 'react-router-dom'
import Home from './Components/Home';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App() {
  const [authorized, setAuthorized] = useState(false)
  const [userID, setUserID] = useState("")
  const [userEmail, setUserEmail] = useState("")

  const handleGoogleLogin = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (userCredentials)=>{
        if(userCredentials){
          setUserID(userCredentials.additionalUserInfo.profile.id)
          setUserEmail(userCredentials.additionalUserInfo.profile.email)
          setAuthorized(true)
        }
        console.log(userCredentials);
      }
    )
  };

  return (
    <div className="App">
      {!authorized ? 
        <div className="box-signin">
          <button class="bg-sky-500 hover:bg-sky-700 ... rounded-full ... text-base ... py-1 ... px-2" onClick={handleGoogleLogin}>
            Login with Google
          </button> 
        </div>
      :
        <div>
            <h1>
              Hi {userEmail} you're id is: {userID}. You're Signed In!
            </h1>
          <Header/>
          <Footer/>
          <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
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