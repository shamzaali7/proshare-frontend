import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Home({user, allUsers, dropDown, setDropDown, addModal, setAddModal, handleAddModal, handleAddModalSubmit}){
    const [projects, setProjects] = useState([])
    const axiosProjects = {
        method: "GET",
        url: 'https://proshare-backend.herokuapp.com/api/projects'
    }

    useEffect(() => {
        getProjects()
        setAddModal(addModal);
      }, []);

    function getProjects(){
        axios.request(axiosProjects)
            .then(function(res){
                setProjects(res.data)
            }).catch(err => console.log(err))
    }

    return(
        <div className="container-home font-change">
            <div className="explore">Explore</div>
                {projects.map((project) => {
                return(
                    <div className="container-spacer">
                        <div></div>
                        <div className="home-projects shadow-xl">
                            <div className="container-title">
                                <div></div>
                                <div className="project-titles-box"><p className="project-titles bg-white text-grey-600">{project.title}</p></div>
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
                                                    {project.comments.map((comment)=> {
                                                        if(comment){
                                                            return(
                                                                <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-slate-300 text-slate-50 text-xs">{comment}</span> 
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            )}
                                            <div></div>
                                        </div>
                                        <div className="add-btn">
                                            <button onClick={handleAddModal} className="text-sm">Add</button>
                                        </div>
                                    </div>
                                </div>
                            </div>              
                        </div>
                        <div></div>
                    </div>
                )})}
                {addModal && (
                <div className="modal">
                <div onClick={handleAddModal} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleAddModalSubmit}>
                        <div className="title-form">Enter comment below</div>
                        <div className="input-box">
                            <input type="text" className="input-form" onChange={(e) => {}}/>
                        </div>
                        <button onClick={handleAddModalSubmit} className="modal-submit">Submit</button>
                    </form>
                    <button onClick={handleAddModal} className="close-modal">Exit</button>
                </div>             
                </div>
                )}
        </div>
    )
}

export default Home;