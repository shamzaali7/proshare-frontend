import React from 'react'
import { Link } from 'react-router-dom'

function Header({userID, userCred, user}){

    return(
        <div className="container-header">   
            <div class="h-full w-full"> 
                <nav role="navigation" class="bg-white shadow xl:block hidden">
                    <div class="mx-auto container px-6 py-2 xl:py-0">
                        <div class="flex items-center justify-between">
                            <div class="inset-y-0 left-0 flex items-center xl:hidden">
                                <div class="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                    <div class="visible xl:hidden">
                                        <ul class="p-2 border-r bg-white absolute rounded left-0 right-0 shadow mt-8 md:mt-8 hidden">
                                            <li class="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div class="flex items-center">
                                                    <svg xmlns="" class="icon icon-tabler icon-tabler-grid" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                                        <rect x="4" y="4" width="6" height="6" rx="1"></rect>
                                                        <rect x="14" y="4" width="6" height="6" rx="1"></rect>
                                                        <rect x="4" y="14" width="6" height="6" rx="1"></rect>
                                                        <rect x="14" y="14" width="6" height="6" rx="1"></rect>
                                                    </svg>
                                                    <span class="ml-2 font-bold">Dashboard</span>
                                                </div>
                                            </li>
                                            <li class="flex xl:hidden flex-col cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none flex justify-center" onclick="dropdownHandler(this)">
                                                <div class="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-puzzle" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z"></path>
                                                        <path d="M4 7h3a1 1 0 0 0 1 -1v-1a2 2 0 0 1 4 0v1a1 1 0 0 0 1 1h3a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h1a2 2 0 0 1 0 4h-1a1 1 0 0 0 -1 1v3a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-1a2 2 0 0 0 -4 0v1a1 1 0 0 1 -1 1h-3a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1h1a2 2 0 0 0 0 -4h-1a1 1 0 0 1 -1 -1v-3a1 1 0 0 1 1 -1"></path>
                                                    </svg>
                                                    <span class="ml-2 font-bold">IDE</span>
                                                </div>
                                            </li>
                                            <li class="flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-compass" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                                    <polyline points="8 16 10 10 16 8 14 14 8 16"></polyline>
                                                    <circle cx="12" cy="12" r="9"></circle>
                                                </svg>
                                                <span class="ml-2 font-bold">Performance</span>
                                            </li>
                                            <li class="border-b border-gray-300 flex xl:hidden cursor-pointer text-gray-600 text-sm leading-3 tracking-normal pt-2 pb-4 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-code" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z"></path>
                                                    <polyline points="7 8 3 12 7 16"></polyline>
                                                    <polyline points="17 8 21 12 17 16"></polyline>
                                                    <line x1="14" y1="4" x2="10" y2="20"></line>
                                                </svg>
                                                <span class="ml-2 font-bold">Deliverables</span>
                                            </li>
                                            <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal mt-2 py-2 hover:text-indigo-700 flex items-center focus:text-indigo-700 focus:outline-none">
                                                <div class="flex items-center">
                                                    <div class="w-12 cursor-pointer flex text-sm border-2 border-transparent rounded focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                                        <img class="rounded h-10 w-10 object-cover" src="https://tuk-cdn.s3.amazonaws.com/assets/components/horizontal_navigation/hn_1.png" alt="logo" />
                                                    </div>
                                                    <p class="text-sm ml-2 cursor-pointer">{userCred.additionalUserInfo.profile.email}</p>
                                                    <div class="sm:ml-2 text-white relative">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-down cursor-pointer" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z"></path>
                                                            <polyline points="6 9 12 15 18 9"></polyline>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                                                <div class="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" />
                                                        <circle cx="12" cy="7" r="4" />
                                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                                    </svg>
                                                    <span class="ml-2">Profile</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <img class="show-m-menu icon icon-tabler icon-tabler-menu" onclick="MenuHandler(this,true)" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg2.svg" alt="icon" />
                                    </div>
                                    <div class="hidden close-m-menu text-gray-700" onclick="MenuHandler(this,false)">
                                        <img  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg1.svg" alt="icon-2" />
                                    </div>
                                </div>
                            </div>
                            <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 rounded-md flex w-full sm:w-auto items-center sm:items-stretch justify-end sm:justify-start">
                                <Link to="/">
                                    <div  class="flex items-center">
                                        <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                                        <h2 class="hidden text-lg sm:block text-base text-gray-500 font-bold leading-normal px-3">
                                            CODESHARE
                                        </h2>
                                    </div>
                                </Link>
                            </button>
                            <div class="flex">
                                <div class="hidden xl:flex md:mr-6 xl:mr-16">
                                    <Link to={"/accounts/" + userID} class="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
                                        <span class="mr-2">
                                            <img class="icon icon-tabler icon-tabler-grid" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg4.svg" alt="dashboard" />
                                        </span>
                                        Dashboard
                                    </Link>
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
                                <div class="hidden xl:flex items-center">
                                    <div class="ml-6 relative">
                                        <div class="cursor-pointer flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-white transition duration-150 ease-in-out">
                                            <img class="rounded-full h-10 w-10 object-cover" src={user.profilePicture} alt="logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav>
                    <div class="py-4 px-6 w-full flex xl:hidden justify-between items-center bg-white fixed top-0 z-40">
                        <div aria-label="logo" role="img" tabindex="0" class="focus:outline-none w-24">
                            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg9.svg" alt="logo" />
                        </div>
                        <div class="flex items-center">
                            <div class="relative mr-6">
                                <button class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none bg-gray-100 border-gray-300 border transition duration-150 ease-in-out hover:bg-gray-300 rounded text-gray-600 px-5 py-2 text-xs">Manage</button>
                            </div>
                            <button id="menu" aria-label="open menu" class="focus:outline-none focus:ring-2 focus:ring-gray-600 rounded-md text-gray-800" onclick="sidebarHandler(true)">
                                <img class="icon icon-tabler icon-tabler-menu-2" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg10.svg" alt="menu" />
                            </button>
                        </div>
                    </div>
                    <div class="absolute w-full h-full transform -translate-x-full z-40 xl:hidden" id="mobile-nav">
                        <div class="bg-gray-800 opacity-50 w-full h-full" onclick="sidebarHandler(false)"></div>
                        <div class="w-64 z-40 fixed overflow-y-auto z-40 top-0 bg-white shadow h-full flex-col justify-between xl:hidden pb-4 transition duration-150 ease-in-out">
                            <div class="px-6 h-full">
                                <div class="flex flex-col justify-between h-full w-full">
                                    <div>
                                        <div class="mt-6 flex w-full items-center justify-between">
                                            <div class="flex items-center justify-between w-full">
                                                <div class="flex items-center">
                                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg9.svg" alt="logo" />
                                                    <p tabindex="0" class="focus:outline-none text-base md:text-2xl text-gray-800 ml-3">The North</p>
                                                </div>
                                                <button id="cross" aria-label="close menu" class="focus:outline-none focus:ring-2 rounded-md text-gray-800" onclick="sidebarHandler(false)">
                                                    <img class="icon icon-tabler icon-tabler-x" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg11.svg" alt="cross" />
                                                </button>
                                            </div>
                                        </div>
                                        <ul class="f-m-m">
                                            <li>
                                                <a class="cursor-pointer">
                                                    <div class="text-gray-800 pt-10">
                                                        <div class="flex items-center">
                                                            <div class="w-6 h-6 md:w-8 md:h-8 text-indigo-700">
                                                            <img class="icon icon-tabler icon-tabler-grid" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg12.svg" alt="dashboard" />
                                                            </div>
                                                            <p tabindex="0" class="focus:outline-none focus:text-indigo-600 text-indigo-700 xl:text-base text-base ml-3">Dashboard</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="cursor-pointer">
                                                    <div class="text-gray-800 pt-8">
                                                        <div class="flex items-center justify-between">
                                                            <div class="flex items-center">
                                                                <div class="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <img class="icon icon-tabler icon-tabler-puzzle" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg13.svg" alt="products" />
                                                                </div>
                                                                <p tabindex="0" class="focus:outline-none focus:text-indigo-600 text-gray-800 xl:text-base md:text-2xl text-base ml-3">Products</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="cursor-pointer">
                                                    <div class="text-gray-800 pt-8">
                                                        <div class="flex items-center">
                                                            <div class="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                                <img class="icon icon-tabler icon-tabler-compass" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg14.svg" alt="performance" />
                                                            </div> 
                                                            <p tabindex="0" class="focus:outline-none focus:text-indigo-600 text-gray-800 xl:text-base md:text-2xl text-base ml-3">Performance</p>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li class="text-gray-800 pt-8 cursor-pointer">
                                                <div class="flex items-center justify-between">
                                                    <div class="flex items-center">
                                                        <div class="w-6 h-6 md:w-8 md:h-8 text-gray-800">
                                                            <img class="icon icon-tabler icon-tabler-code" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg15.svg" alt="deliverables" />
                                                        </div>
                                                        <p tabindex="0" class="focus:outline-none focus:text-indigo-600 text-gray-800 xl:text-base md:text-2xl text-base ml-3">Deliverables</p>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="w-full pt-4">
                                        <div class="flex justify-center mb-4 w-full">
                                            <div class="relative w-full">
                                                <div class="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                                    <img class="icon icon-tabler icon-tabler-search" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg16.svg" alt="search" />
                                                </div>
                                                <input class="focus:ring-2 focus:ring-gray-600 bg-gray-100 focus:outline-none rounded w-full text-sm text-gray-500 pl-10 py-2" type="text" placeholder="Search" />
                                            </div>
                                        </div>
                                        <div class="border-t border-gray-300">
                                            <div class="w-full flex items-center justify-between pt-1">
                                                <div class="flex items-center">
                                                    <img alt="profile-pic" src="https://tuk-cdn.s3.amazonaws.com/assets/components/boxed_layout/bl_1.png" tabindex="0" class="focus:outline-none  w-8 h-8 rounded-md" />
                                                    <p tabindex="0" class="focus:outline-none text-gray-800 text-base leading-4 ml-2">Jane Doe</p>
                                                </div>
                                                <ul class="flex">
                                                    <li class="cursor-pointer text-gray-800 pt-5 pb-3">
                                                        <div tabindex="0" class="focus:outline-none focus:text-indigo-600 w-6 h-6 md:w-8 md:h-8">
                                                        <img class="icon icon-tabler icon-tabler-messages" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg17.svg" alt="chat" />
                                                        </div>
                                                    </li>
                                                    <li class="cursor-pointer text-gray-800 pt-5 pb-3 pl-3">
                                                        <div tabindex="0" class="focus:outline-none focus:text-indigo-600 w-6 h-6 md:w-8 md:h-8">
                                                            <img class="icon icon-tabler icon-tabler-bell" src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light-with-button-svg18.svg" alt="bell" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
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

            {/* <div className="box-header">
                <span className="link-home">
                    <Link style={{textDecoration: "none"}} to="/">
                        Home
                    </Link>
                </span>
                <span className="link-account">
                    <Link style={{textDecoration: "none"}} to={"/accounts/" + userID}>
                        Dashboard
                    </Link>
                </span>
                <span className="link-ide">
                    <Link style={{textDecoration: "none"}} to="/ide">
                        IDE
                    </Link>
                </span>
            </div> */}



            // <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            // <div class="container flex flex-wrap items-center justify-between mx-auto">
            //     {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" /> */}
            //     <span class="self-center text-4xl font-semibold whitespace-nowrap dark:text-white">Proshare</span>
            // <div class="flex items-center md:order-2">
            //     <button type="button" class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            //         <span class="sr-only">Open user menu</span>
            //         <img class="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="user photo"/>
            //     </button>
            //     <div class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
            //         <div class="px-4 py-3">
            //         <span class="block text-sm text-gray-900 dark:text-white">{userCred.additionalUserInfo.profile.name}</span>
            //         <span class="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{userCred.additionalUserInfo.profile.email}</span>
            //         </div>
            //     </div>
            //     <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
            //         <span class="sr-only">Open main menu</span>
            //         <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="https://i.imgur.com/gknOxHt.jpg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            //     </button>
            // </div>
            // <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
            //     <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            //         <li>
            //             <Link to="/" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
            //         </li>
            //         <li>
            //             <Link to={"/accounts/" + userID} class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
            //         </li>
            //         <li>
            //             <Link to="/ide" class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">IDE</Link>
            //         </li>
            //     </ul>
            // </div>
            // </div>
            // </nav>