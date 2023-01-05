import axios from 'axios';
import {React, useEffect, useState} from 'react'

function Search(){
    const [projects, setProjects] = useState([])
    const [input, setInput] = useState("")
    const [filteredProjects, setFilteredProjects] = useState([])

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        try{
            const getProjects = await axios.get("https://proshare-backend.herokuapp.com/api/projects")
            if(getProjects){
                setProjects(getProjects.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        setInput(e.target.value)
        let filter = projects.filter((project) => 
            project.title.toLowerCase().includes(input.toLowerCase())
        )
        setFilteredProjects(filter)
    }

    return(
        <div>
            <form>   
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="search-field">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <div>
                            <input onChange={handleChange} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Projects" required/>
                        </div>
                    </div>
                </div>
            </form>
            <div>
                {filteredProjects.map((project) => {
                    return(
                        <div className="home-projects">
                            <div className="container-title">
                                <div></div>
                                <div className="project-titles-box"><p className="project-titles">{project.title}</p></div>
                                <div></div>
                            </div>
                            <div className="home-showcase">
                                <div className="container-showcase">
                                    <div>
                                        <div className="home-deployedLink"><p><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Link</p></a></p></div>
                                        <div className="home-repo"><p><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements slinks">Repo</p></a></p></div>
                                    </div>
                                    <div className="box-showcase"><img className="project-pic" src={project.picture} alt="N/A"/></div>
                                    <div className="home-comments"><p className="side-elements">Comments</p> {project.comments.map((comment)=> {
                                        return(
                                            <div className="search-comments">{comment}</div>
                                        )})}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search;