import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import { getAuth, signOut } from "firebase/auth";

function Header({ user, authorized, setAuthorized, userCred, handleGoogleLogin}){
    const [show, setShow] = useState(null);
    const [profile, setProfile] = useState(false);
    const navigate = useNavigate();

    // if(show == null){
    //     document.body.start.overflow = "hidden";
    // }else{
    //     document.body.start.overflow = "auto";
    // }

    const handleLogout = async (e) => {
        e.preventDefault();
        navigate("/");
        await setAuthorized(!authorized)
        const auth = getAuth();
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    const handleMarginTop = (e) => {
        e.preventDefault();
        setShow(!show)
        document.body.style.overflow = "hidden";
    }

    if(show){
        document.body.style.overflow = "auto";
    }

    let hi;
    if(authorized){
        hi = "Hi " + userCred.additionalUserInfo.profile.given_name + "!"
    }

    return (
        <div className="container-header">   
            <div className="bg-gray-200 h-full w-full">
                <nav className="bg-white shadow xl:block hidden">
                    <div className="mx-auto container px-6 py-2 xl:py-0">
                        <div className="flex items-center justify-between">
                            <div className="inset-y-0 left-0 flex items-center xl:hidden">
                                <div className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                    <div className="visible xl:hidden">
                                        <ul className="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                                            <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-grid" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <rect x={4} y={4} width={6} height={6} rx={1} />
                                                        <rect x={14} y={4} width={6} height={6} rx={1} />
                                                        <rect x={4} y={14} width={6} height={6} rx={1} />
                                                        <rect x={14} y={14} width={6} height={6} rx={1} />
                                                    </svg>
                                                    <span className="ml-2 font-bold">Dashboard</span>
                                                </div>
                                            </li>
                                            <li className="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-puzzle" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1" />
                                                    </svg>
                                                    <span className="ml-2 font-bold">Products</span>
                                                </div>
                                            </li>
                                            <li className="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-compass" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="8 16 10 10 16 8 14 14 8 16" />
                                                    <circle cx={12} cy={12} r={9} />
                                                </svg>
                                                <span className="ml-2 font-bold">Performance</span>
                                            </li>
                                            <li className="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-code" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="7 8 3 12 7 16" />
                                                    <polyline points="17 8 21 12 17 16" />
                                                    <line x1={14} y1={4} x2={10} y2={20} />
                                                </svg>
                                                <span className="ml-2 font-bold">Deliverables</span>
                                            </li>
                                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <div className="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                        <img className="rounded h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png" alt="logo" />
                                                    </div>
                                                    <p className="text-sm ml-2 cursor-pointer">Jane Doe</p>
                                                    <div className="sm:ml-2 text-white relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" />
                                                            <polyline points="6 9 12 15 18 9" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx={12} cy={7} r={4} />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    <span className="ml-2">Profile</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <svg onclick="MenuHandler(this,true)" aria-haspopup="true" aria-label="Main Menu" xmlns="http://www.w3.org/2000/svg" className="show-m-menu icon icon-tabler icon-tabler-menu" width={28} height={28} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1={4} y1={8} x2={20} y2={8} />
                                            <line x1={4} y1={16} x2={20} y2={16} />
                                        </svg>
                                    </div>
                                    <div className="hidden close-m-menu text-gray-700" onclick="MenuHandler(this,false)">
                                        <svg aria-label="Close" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <line x1={18} y1={6} x2={6} y2={18} />
                                            <line x1={6} y1={6} x2={18} y2={18} />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                                <div className="flex items-center">
                                <Link to="/">
                                    <div  class="flex items-center">
                                        <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                                        <h2 class="hidden text-lg sm:block text-base text-gray-500 font-bold leading-normal px-3">
                                            PROSHARE
                                        </h2>
                                    </div>
                                </Link>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="hidden xl:flex md:mr-6 xl:mr-16">
                                {authorized && (        
                                    <Link to="/accounts" className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span class="mr-2">
                                            <img class="icon icon-tabler icon-tabler-grid" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                                        </span>
                                        Dashboard
                                    </Link>
                                )}
                                    <Link to="/ide" class="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span class="mr-2">
                                            <img class="icon icon-tabler icon-tabler-puzzle" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                                        </span>
                                        IDE
                                    </Link>
                                    <Link to="/search" class="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span class="mr-2">
                                            <img class="icon icon-tabler icon-tabler-puzzle" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg16.svg" alt="products" />
                                        </span>
                                        Search
                                    </Link>
                                </div>
                                {authorized && (
                                <div className="hidden xl:flex items-center">
                                    <div className="ml-6 relative">
                                        <div className="flex items-center relative" onClick={() => setProfile(!profile)}>
                                        <div className="hi mx-2">{hi}</div>
                                            {profile && (
                                                <ul className="p-2 w-40 border-r bg-white absolute rounded right-0 shadow top-0 mt-16 ">
                                                    <li className="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                        <div onClick={handleLogout} className="flex items-center">
                                                            <img className="w-8 h-8" src="https://img.icons8.com/sf-ultralight/50/null/exit.png" alt="Logout Icon"/>
                                                            <span className="ml-2">Logout</span>
                                                        </div>
                                                    </li>
                                                </ul>
                                            )}
                                            <div className="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                {user.profilePicture ? (
                                                    <img class="rounded-full h-10 w-10 object-cover" src={user.profilePicture} alt="logo" />
                                                ) : (
                                                    <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" className="w-8 h-8" alt="Profile Pic"/>
                                                )}
                                            </div>
                                            <div className="ml-2 text-gray-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" />
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                )}
                                {!authorized && (
                                    <div onClick={handleGoogleLogin} class="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <div className="box-signin">
                                        <button>
                                            Login with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
                                        </button> 
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
                <nav>
                    <div className={show ? ("py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40") : ("py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40")}>
                        <div className="flex items-center">
                            <div id="menu" className="text-gray-800" onClick={handleMarginTop}>
                                {show ? (
                                    <div className="filler"></div>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu-2 " width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1={4} y1={6} x2={20} y2={6} />
                                        <line x1={4} y1={12} x2={20} y2={12} />
                                        <line x1={4} y1={18} x2={20} y2={18} />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={show ? "w-full xl:hidden h-full absolute z-40  transform  translate-x-0 absolute" : "w-full xl:hidden h-full absolute z-40 transform -translate-x-full"}>
                        <div className="bg-gray-800 opacity-50 w-full h-full" onClick={() => setShow(!show)} />
                        <div className="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="px-6 h-full">
                                <div className="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div className="mt-6 flex w-full items-center justify-between">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center">
                                                    <Link to="/">
                                                        <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                                                        <p className="text-base md:text-2xl text-gray-800 ml-3">ProShare</p>
                                                    </Link>
                                                </div>
                                                <div id="cross" className="text-gray-800" onClick={() => setShow(!show)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <line x1={18} y1={6} x2={6} y2={18} />
                                                        <line x1={6} y1={6} x2={18} y2={18} />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <ul className="f-m-m">
                                            {authorized && (
                                                <Link to="/accounts" className="cursor-pointer">
                                                    <li className="text-gray-800 pt-10">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <span class="mr-2">
                                                                    <img className="icon icon-tabler icon-tabler-grid w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base text-base ml-3">Dashboard</p>
                                                        </div>
                                                    </li>
                                                </Link>
                                            )}
                                            <Link to="/ide" className="cursor-pointer">
                                                <li className="text-gray-800 pt-8">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <span class="mr-2">
                                                                    <img class="icon icon-tabler icon-tabler-puzzle w-7 h-7" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg5.svg" alt="products" />
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base text-base ml-3">Code Test</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                            <Link to="/search">
                                                <li className="text-gray-800 pt-8 cursor-pointer">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center">
                                                            <div className="w-6 h-6 md:w-8 md:h-8 text-gray-800 ml-1">
                                                                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">
                                                                    <path d="M15.853 16.56c-1.683 1.517-3.911 2.44-6.353 2.44-5.243 0-9.5-4.257-9.5-9.5s4.257-9.5 9.5-9.5 9.5 4.257 9.5 9.5c0 2.442-.923 4.67-2.44 6.353l7.44 7.44-.707.707-7.44-7.44zm-6.353-15.56c4.691 0 8.5 3.809 8.5 8.5s-3.809 8.5-8.5 8.5-8.5-3.809-8.5-8.5 3.809-8.5 8.5-8.5z"/>
                                                                </svg>
                                                            </div>
                                                            <p className="text-gray-800 xl:text-base text-base ml-3">Search</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                    {authorized ? (
                                        <div className="w-full pt-4">
                                            <div className="flex mb-4 w-full justify-center cursor-pointer" onClick={handleLogout}>
                                                <div className="flex items-center text-right">
                                                    <div className="flex items-center">
                                                        <img  className="h-8 w-8" src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/96/null/external-smartphone-with-logout-option-with-sign-off-arrow-development-shadow-tal-revivo.png" alt="Logout Icon"/>
                                                        <span className="ml-2">Logout</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-t border-gray-300 items-center text-right">
                                                <div className="w-full flex items-center justify-center pt-1">
                                                    <div className="flex items-center text-right">
                                                        {user.profilePicture ? (
                                                            <img src={user.profilePicture} alt="" className="w-8 h-8 rounded-md" />
                                                        ) : (
                                                            <img src="https://img.icons8.com/ios/50/null/user-male-circle--v1.png" alt="ProfilePic" className="h-8 w-8"/>
                                                        )}
                                                        <p className=" text-gray-800 text-base leading-4 ml-2">{user.name}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="box-signin hover:bg-slate-200 ... rounded-2xl">
                                        <button className="text-base ... py-1 ... px-2" onClick={handleGoogleLogin}>
                                            Login with <span className="google-blue">G</span><span className="google-red">o</span><span className="google-yellow">o</span><span className="google-blue">g</span><span className="google-green">l</span><span className="google-red">e</span>
                                        </button> 
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>  
            </div>
        </div>
    )
}

export default Header;


/* <div className="relative w-full">
<div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth={1} stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
<path stroke="none" d="M0 0h24v24H0z" />
<circle cx={10} cy={10} r={7} />
<line x1={21} y1={21} x2={15} y2={15} />
</svg>
</div>
<input className="bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500  pl-10 py-2" type="text" placeholder="Search" />
</div> */