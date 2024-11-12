import axios from 'axios';
import React, { useEffect } from 'react'

function Search({dropDown, setDropDown, allUsers, projects, setProjects, addModal, handleAddModal, handleAddModalSubmit, setComment, setCurrentProject, filteredProjects, setFilteredProjects, input, setInput}){

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        try{
            const getProjects = await axios.get("https://proshare-backend-27b5d2fdd236.herokuapp.com/api/projects")
            if(getProjects){
                setProjects(getProjects.data)
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value)
        let filter = projects.filter((project) => 
            project.title.toLowerCase().includes(input.toLowerCase())
        )
        setFilteredProjects(filter)
    }

    return(
        <div className="mt-0 font-change">
            <div className="search-projects">
                <div></div>
                <div>
                    <form onSubmit={(e) => {e.preventDefault()}}>   
                        <label htmlFor="default-search" className="pb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="search-field">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <div>
                                    <input onChange={handleChange} type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Projects" required/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div></div>
            </div>
            <div className="search-display my-10">
                <div></div>
                {filteredProjects.map((project) => {
                    return(
                        <div className="home-projects shadow-xl">
                            <div className="container-title">
                                <div></div>
                                <div className="project-titles-box"><p className="project-titles bg-white">{project.title}</p></div>
                                <div className="project-creator">
                                    <div></div>
                                    <div className="box-project-creator">
                                        <span className="mr-1">by: {project.creator}</span>
                                        {allUsers.map((person) => {return(
                                            <span>
                                            {(person.googleid === project.gid) && (
                                                <img className="rounded-full h-10 w-10 object-cover" src={person.profilePicture} alt="logo" />
                                            )}
                                            </span>
                                        )})}
                                    </div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="home-showcase">
                                <div className="container-showcase">
                                    <div>
                                        <div className="container-deployed">
                                            <div></div>
                                            <div className="home-deployed"><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements links">Deployed Site</p></a></div>
                                            <div></div>
                                        </div>
                                        <div className="container-repo">
                                            <div></div>
                                            <div className="home-repo"><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements links">Repo</p></a></div>
                                            <div></div>
                                        </div>
                                    </div>
                                    <div className="box-showcase"><img className="project-pic" src={project.picture} alt="N/A"/></div>
                                    <div className="home-comments">
                                        <div className="container-comment-btn">
                                            <div></div>
                                            <div className="box-comment-btn">
                                                <button onClick={() => {setDropDown(!dropDown)}} className="side-elements slink focus:ring-2 focus:outline-none focus:ring-grey-700 font-medium rounded-lg text-sm px-1 py-.5 text-center inline-flex items-center dark:hover:bg-grey-700 dark:focus:ring-grey-800">
                                                    Comments 
                                                    <svg className="w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                                                        </path>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div></div>
                                        </div>
                                        <div className="container-dropdown">
                                            <div></div>
                                            {dropDown && (
                                                <div className="comments-display items-center divide-y divide-gray-100 shadow rounded dark:bg-gray-600 cursor-default">          
                                                    {project.comments.map((comment) => {
                                                        if(comment){
                                                            return(
                                                                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-300 text-slate-50 text-xs">{comment}</span> 
                                                            )
                                                        }else{
                                                            return(
                                                                <span></span>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            )}
                                            <div></div>
                                        </div>
                                        <div className="container-add-btn">
                                            <div></div>
                                            <div className="add-btn">
                                            <button onClick={(e) => {
                                                handleAddModal()
                                                setCurrentProject({_id: project._id, comments: project.comments})
                                            }} className="text-sm">+</button>
                                            </div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    )})}
                    <div></div>
            </div>
            {addModal && (
                <div className="modal">
                <div onClick={handleAddModal} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleAddModalSubmit}>
                        <div className="title-form">Enter comment below</div>
                        <div className="input-box">
                            <input type="text" className="input-form" onChange={(e) => setComment(e.target.value)}/>
                        </div>
                        <button onClick={handleAddModalSubmit} className="btn-update-project mt-1">Submit</button>
                    </form>
                    <button onClick={handleAddModal} className="close-modal">Exit</button>
                </div>             
                </div>
            )}
        </div>
    )
}

export default Search;