import axios from 'axios';
import {useState, React, useEffect} from 'react'

function Home(){
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
    return(
        <div className="container-home">
            <div className="explore">Explore</div>
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
                                <div className="box-showcase"><img className="project-pic" src={project.picture} alt="N/A"/></div>
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
        </div>
    )
}

export default Home;