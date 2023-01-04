import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Profile({userID}){
    const [projects, setProjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalTwo, setModalTwo] = useState(false);
    const [form, setForm] = useState({
        title: "",
        github: "",
        deployedLink: "",
        picture: "",
        gid: userID,
    });
    const [formPut, setFormPut] = useState({
        _id: "",
        title: "",
        github: "",
        deployedLink: "",
        picture: "",
        gid: userID,
    })

    const axiosProjects = {
        method: "GET",
        url: `https://proshare-backend.herokuapp.com/api/projects/${userID}`
    };

    useEffect(() => {
        getProjects()
      }, []);

    function getProjects(){
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
            gid: userID
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
    console.log(formPut)

    return(
        <div className="container-home">
            <div class="container-new-project">
                <div></div>
                <div className="explore">My Projects</div>
                <div className="explore">
                    <p><button onClick={handleModalState} className="button">
                        New Project
                    </button>
                    </p>
                </div>
            </div>
            {projects.map((project) => {
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
                                <div className="box-showcase"><img className="project-pic" src={project.picture} alt=""/></div>
                                <div className="home-comments"><p className="side-elements">Comments</p> {project.comments.map((comment)=> {
                                    return(
                                        <div>{comment}</div>
                                    )})}
                                </div>
                            </div>
                            <p>
                                <button onClick={() => {
                                        setFormPut({_id : project._id})
                                        handlePutModalState()}} className="button">
                                    Update
                                </button>
                            </p>
                        </div>
                    </div>
                )
            })}
            {modal && (
                <div className="modal">
                <div onClick={handleModalState} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="title-form">Create Form</div>
                        <div className="input-box">
                            <h3 className="input-lbl">Title</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ title: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Repo</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ github: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Deployed Link</h3>
                            <input type="text" className="input-form" onChange={(e) => editForm({ deployedLink: e.target.value})}/>
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
                        <div className="title-form">Update Form</div>
                        <div className="input-box">
                            <h3 className="input-lbl">Title</h3>
                            <input type="text" value={formPut.title} className="input-form" onChange={(e) => editFormTwo({ title: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Repo</h3>
                            <input type="text" value={formPut.github} className="input-form" onChange={(e) => editFormTwo({ github: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Deployed Link</h3>
                            <input type="text" className="input-form" onChange={(e) => editFormTwo({ deployedLink: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <h3 className="input-lbl">Picture Link</h3>
                            <input type="text" className="input-form" onChange={(e) => editFormTwo({ picture: e.target.value})}/>
                        </div>
                        <button onClick={handlePutSubmit} className="modal-submit">Submit</button>
                    </form>
                    <button onClick={handlePutModalState} className="close-modal">Exit</button>
                </div>             
            </div>
            )}

        </div>
    )
}

export default Profile;