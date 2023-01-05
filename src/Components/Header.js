import React from 'react'
import { Link } from 'react-router-dom'

function Header({userID, user}){

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

