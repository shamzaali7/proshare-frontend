import React from 'react'
import { Link } from 'react-router-dom'

function Header({userID, userCred, user}){

    return(
        <div className="container-header">   
            <div class="h-full w-full"> 
                <nav role="navigation" class="bg-white shadow xl:block hidden">
                    <div class="mx-auto container px-6 py-2 xl:py-0">
                        <div class="flex items-center justify-between">                           
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
                                    <Link to={"/accounts/" + userID} className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
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
                                <Link to="/">
                                    <div  class="flex items-center">
                                        <img src="https://img.icons8.com/clouds/70/000000/code.png" alt="logo" />
                                        <h2 class="hidden text-lg sm:block text-base text-gray-500 font-bold leading-normal px-3">
                                            CODESHARE
                                        </h2>
                                    </div>
                                </Link>
                        <div class="flex items-center">
                                <Link to={"/accounts/" + userID} className="focus:text-indigo-700 border-b-2 border-transparent focus:border-indigo-700 flex px-5 items-center py-6 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none transition duration-150 ease-in-out">
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