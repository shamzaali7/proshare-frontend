import axios from 'axios';
import React, {useState, useEffect} from 'react'

function Profile({userID, userCred, authorized, projects, setProjects, dropDown, handleDropDownModal}){
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [form, setForm] = useState({
        title: "",
        github: "",
        deployedLink: "",
        picture: "",
        gid: userID,
        backendRepo: "",
        backendDeploy: "",
        creator: userCred.additionalUserInfo.profile.name
    });
    const [formPut, setFormPut] = useState({
        _id: "",
        title: "",
        github: "",
        deployedLink: "",
        picture: "",
        gid: userID,
        backendRepo: "",
        backendDeploy: "",
        creator: userCred.additionalUserInfo.profile.name
    })
    const [formDelete, setFormDelete] = useState({_id: ""})

    useEffect(() => {
        getProjects()
      }, []);

    function getProjects(){
        const axiosProjects = {
            method: "GET",
            url: `https://proshare-backend.herokuapp.com/api/projects/${userID}`
        };
        axios.request(axiosProjects)
            .then(function(res){
                setProjects(res.data)
            }).catch(err => console.log(err))
    }

    if(modal || modalTwo || modalDelete){
        document.body.style.overflow = "hidden";
    }else{
        document.body.style.overflow = "auto"
    }

    const handleModalState = () => {
        setModal(!modal)
    }
    
    const handlePutModalState = () => {
        setModalTwo(!modalTwo)
    }
    const handleDeleteModalState = () => {
        setModalDelete(!modalDelete)
    }

    const editForm = (value) => {
        return setForm((last) => {
            return {...last, ...value}
        })
    }
    const editFormTwo = (value) => {
        return setFormPut((last) => {
            return {...last, ...value}
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const Project = await axios.post("https://proshare-backend.herokuapp.com/api/projects", form)
        }
        catch(err){
            console.log(err)
        }
        handleModalState();
        getProjects();
        setForm({
            title: "",
            github: "",
            deployedLink: "",
            picture: "",
            gid: userID,
            backendRepo: "",
            backendDeploy: "",
            creator:  userCred.additionalUserInfo.profile.name
        })
    }
    
    const handlePutSubmit = async (e) => {
        e.preventDefault();
        try {
            const Project = await axios.put("https://proshare-backend.herokuapp.com/api/projects", formPut)
        }
        catch(err){
            console.log(err)
        }
        handlePutModalState();
        getProjects();
    }

    const handleDeleteSubmit = async (e) => {
        e.preventDefault();
        await fetch(`https://proshare-backend.herokuapp.com/api/projects`, {
            method: "DELETE",
            headers: {
           'Content-Type': 'application/json'
            },
            body: JSON.stringify({_id : formDelete._id})
        });
        handleDeleteModalState();
        getProjects();
    }

    const handleClose = async (e) => {
        document.body.style.overflow = "auto";
    }

    if (authorized){
    return(
        <div className="container-home font-change">
            <div class="container-new-project">
                <div></div>
                <div className="explore">My Projects</div>
                <div className="explore">
                    <p><button onClick={handleModalState} className="new-project">
                        New Project
                    </button>
                    </p>
                </div>
            </div>
            {projects && (projects.map((project) => {
                return(
                    <div className="container-spacer">
                        <div></div>
                        <div className="home-projects shadow-xl">
                            <div className="container-title">
                                <div></div>
                                <div className="project-titles-box"><p className="project-titles bg-white">{project.title}</p></div>
                                <div></div>
                            </div>
                            <div className="home-showcase">
                                <div className="container-showcase">
                                    <div>
                                        <div className="container-deployed">
                                            <div></div>
                                            <div className="home-deployed"><p><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Site</p></a></p></div>
                                            <div></div>
                                        </div>
                                        <div className="container-repo">
                                            <div></div>
                                            <div className="home-repo"><p><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements slink">Frontend Repo</p></a></p></div>
                                            <div></div>
                                        </div>
                                        {project.backendRepo && (
                                            <span>
                                                <div className="container-back-link">
                                                    <div></div>
                                                    <div className="home-deployedLink"><p><a href={project.backendDeploy} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Back</p></a></p></div>
                                                    <div></div>
                                                </div>
                                                <div className="container-back-repo">
                                                    <div></div>
                                                    <div className="home-repo"><p><a href={project.backendRepo} target="_blank" rel="noreferrer"><p className="side-elements slink">Backend Repo</p></a></p></div>
                                                    <div></div>
                                                </div>
                                            </span>
                                        )} 
                                    </div>
                                    <div className="box-showcase"><img className="project-pic" src={project.picture} alt=""/></div>
                                    <div className="home-comments">
                                        <div className="container-comment-btn">
                                            <div></div>
                                            <div className="box-comment-btn">
                                                <button onClick={handleDropDownModal} className="side-elements slink focus:ring-2 focus:outline-none focus:ring-grey-700 font-medium rounded-lg text-sm px-1 py-.5 text-center inline-flex items-center dark:hover:bg-grey-700 dark:focus:ring-grey-800">
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
                                                        }
                                                    })}
                                                </div>
                                            )}
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="change-buttons">
                                    <button className="btn-update-project" onClick={() => {
                                            setFormPut({_id : project._id, title: project.title, github: project.github, deployedLink: project.deployedLink, backendRepo: project.backendRepo, backendDeploy: project.backendDeploy, picture: project.picture})
                                            handlePutModalState()}}>
                                        Update
                                    </button>
                                    <button className="btn-delete-project" onClick={() => {
                                            setFormDelete({_id : project._id})
                                            handleDeleteModalState()}}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div></div>
                    </div>
                )
            }))}
            {modal && (
                <div className="modal">
                <div onClick={handleModalState} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit} onClose={handleClose}>
                        <div className="title-form">Create</div>
                        <div className="input-box">
                            <h3 className="input-lbl">Title</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ title: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Front-End Repo</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ github: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Front-End Site</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ deployedLink: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Back-End Repo</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ backendRepo: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Back-End Site</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ backendDeploy: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Picture Link</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ picture: e.target.value})}/>
                        </div>
                        <button onClick={handleSubmit} className="modal-submit">Submit</button>
                    </form>
                    <button onClick={handleModalState} className="close-modal">Exit</button>
                </div>             
                </div>
            )}
            {modalTwo && (
                <div className="modal">
                <div onClick={handlePutModalState} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handlePutSubmit}>
                        <div className="title-form">Update</div>
                        <div className="input-box">
                            <h3 className="input-lbl">Title</h3>
                            <input type="text" value={formPut.title} className="input-form" onChange={(e) => editFormTwo({ title: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Front-End Repo</h3>
                            <input type="text" value={formPut.github} className="input-form" onChange={(e) => editFormTwo({ github: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Front-End Site</h3>
                            <input type="text" value={formPut.deployedLink} className="input-form" onChange={(e) => editFormTwo({ deployedLink: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Back-End Repo</h3>
                            <input type="text" value={formPut.backendRepo} className="input-form" onChange={(e) => editFormTwo({ backendRepo: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Back-End Site</h3>
                            <input type="text" value={formPut.backendDeploy} className="input-form" onChange={(e) => editFormTwo({ backendDeploy: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Picture Link</h3>
                            <input type="text" value={formPut.picture} className="input-form" onChange={(e) => editFormTwo({ picture: e.target.value})}/>
                        </div>
                        <button onClick={handlePutSubmit} className="modal-submit">Submit</button>
                    </form>
                    <button onClick={handlePutModalState} className="close-modal">Exit</button>
                </div>             
            </div>
            )}
            {modalDelete && (
                <div className="modal">
                    <div onClick={handleDeleteModalState} className="overlay"></div>
                    <div className="modal-content">
                        <form onSubmit={handleDeleteSubmit}>
                            <div className="delete-modal-question">Confirm Delete</div>
                            <button onClick={handleDeleteSubmit} className="dark-border">Delete</button>
                        </form>
                        <button onClick={handleDeleteModalState} className="close-modal">Cancel</button>
                    </div>             
                </div>
            )}
        </div>
    )}
    else {
        return(
            <div className="breach">
                Please Sign In
            </div>
        )
    }}

export default Profile;