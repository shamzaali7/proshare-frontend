import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Profile({userID}){
    const [projects, setProjects] = useState([]);
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState({
        title: "",
        github: "",
        deployedLink: "",
        picture: "",
        gid: userID
    });
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
            }).then(err => console.log(err))
    }

    const handleModal = () => {
        setModal(!modal)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleModal();
    }

    return(
        <div className="container-home">
            <div class="container-new-project">
                <div></div>
                <div className="explore">My Projects</div>
                <div className="explore">
                    <p><button onClick={handleModal} className="button">
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
                                    <div className="home-deployedLink"><p><a href={project.deployedLink} target="_blank"><p className="side-elements slink">Deployed Link</p></a></p></div>
                                    <div className="home-repo"><p><a href={project.github} target="_blank"><p className="side-elements slinks">Repo</p></a></p></div>
                                </div>
                                <div className="box-showcase"><img className="project-pic" src={project.picture}/></div>
                                <div className="home-comments"><p className="side-elements">Comments</p> {project.comments.map((comment)=> {
                                    return(
                                        <div>{comment}</div>
                                    )})}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {modal && (
                <div className="modal">
                <div onClick={handleModal} className="overlay"></div>
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label>Title:</label>
                            <input type="text" className="input-form" onChange={(e) => setForm({ title: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <label>Repo:</label>
                            <input type="text" className="input-form" onChange={(e) => setForm({ github: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <label>Deployed Link:</label>
                            <input type="text" className="input-form" onChange={(e) => setForm({ deployedLink: e.target.value})}/>
                        </div>
                        <div className="input-box">
                            <label>Picture:</label>
                            <input type="text" className="input-form" onChange={(e) => setForm({ picture: e.target.value})}/>
                        </div>
                        <button onClick={handleSubmit} className="">Submit</button>
                    </form>
                    <button onClick={handleModal} className="close-modal">Close</button>
                </div>             
            </div>
            )}
        </div>
    )
}

export default Profile;