import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Profile({userID, userCred}){
    const [projects, setProjects] = useState([]);
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

    return(
        <div className="container-home">
            <div class="container-new-project">
                <div></div>
                <div className="explore">My Projects</div>
                <div className="explore">
                    <p><button onClick={handleModalState} className="new-project button">
                        New Project
                    </button>
                    </p>
                </div>
            </div>
            {projects && (projects.map((project) => {
                return(
                    <div className="home-projects shadow-xl">
                        <div className="container-title">
                            <div></div>
                            <div className="project-titles-box"><p className="project-titles bg-white">{project.title}</p></div>
                            <div></div>
                        </div>
                        <div className="home-showcase">
                            <div className="container-showcase">
                                <div>
                                    <div className="home-deployedLink"><p><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Front-End</p></a></p></div>
                                    <div className="home-repo"><p><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements slink">Frontend Repo</p></a></p></div>
                                    <div className="home-deployedLink"><p><a href={project.backendDeploy} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Back-End</p></a></p></div>
                                    <div className="home-repo"><p><a href={project.backendRepo} target="_blank" rel="noreferrer"><p className="side-elements slink">Backend Repo</p></a></p></div>
                                </div>
                                <div><img className="project-pic" src={project.picture} alt=""/></div>
                                <div className="home-comments"><p className="side-elements slink">Comments</p> {project.comments.map((comment)=> {
                                    return(
                                        <div>{comment}</div>
                                    )})}
                                </div>
                            </div>
                            <div className="change-buttons">
                                <button onClick={() => {
                                        setFormPut({_id : project._id, title: project.title, github: project.github, deployedLink: project.deployedLink, backendRepo: project.backendRepo, backendDeploy: project.backendDeploy, picture: project.picture})
                                        handlePutModalState()}} className="button">
                                    Update
                                </button>
                                <button onClick={() => {
                                        setFormDelete({_id : project._id})
                                        handleDeleteModalState()}} className="btn-delete-project">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }))}
            {modal && (
                <div className="modal">
                <div onClick={handleModalState} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
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

export default Profile;