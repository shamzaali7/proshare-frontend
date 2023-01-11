import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Home({user, allUsers, dropDown, setDropDown}){
    const [projects, setProjects] = useState([])
    const axiosProjects = {
        method: "GET",
        url: 'https://proshare-backend.herokuapp.com/api/projects'
    }

    useEffect(() => {
        getProjects()
      }, []);

    function getProjects(){
        axios.request(axiosProjects)
            .then(function(res){
                setProjects(res.data)
            }).catch(err => console.log(err))
    }

    // const handleDropDown = () => {
    //     setDropDown(!dropDown)
    // }

    return(
        <div className="container-home font-change">
            <div className="explore">Explore</div>
                {projects.map((project) => {
                return(
                    <div className="home-projects shadow-xl">
                        <div className="container-title">
                            <div></div>
                            <div className="project-titles-box"><p className="project-titles bg-white text-grey-600">{project.title}</p></div>
                            <div className="project-creator">
                            <span className="mr-1">by: {project.creator}</span>
                                {allUsers.map((person) => {return(
                                    <span>
                                    {(person.googleid === project.gid) && (
                                        <img className="rounded-full h-10 w-10 object-cover" src={person.profilePicture} alt="logo" />
                                    )}
                                    </span>
                                )})}
                            </div>
                        </div>
                        <div className="home-showcase">
                            <div className="container-showcase">
                                <div>
                                    <div className="home-deployedLink"><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Link</p></a></div>
                                    <div className="home-repo"><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements slink">Repo</p></a></div>
                                </div>
                                <div className="box-showcase "><img className="project-pic" src={project.picture} alt="N/A"/></div>
                                <div className="home-comments"><p className="side-elements slink">Comments</p> 
                                    <div>
                                        <button onClick={() => {setDropDown(!dropDown)}} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                            Dropdown button 
                                            <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                                                </path>
                                            </svg>
                                        </button>
                                        {dropDown && (
                                            <div className="items-center z-10 bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                {project.comments.map((comment)=> {
                                                    if(comment){
                                                        return(
                                                            <span>
                                                                <li>
                                                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{comment}</a>
                                                                </li>
                                                            </span>
                                                        )
                                                    }
                                                })}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>              
                    </div>
                )})}
        </div>
    )
}

export default Home;