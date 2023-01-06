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
                    <div className="home-projects shadow-xl">
                        <div className="container-title">
                            <div></div>
                            <div className="project-titles-box"><p className="project-titles bg-white">{project.title}</p></div>
                            <div className="project-creator">by: {project.creator}</div>
                        </div>
                        <div className="home-showcase">
                            <div className="container-showcase">
                                <div>
                                    <div className="home-deployedLink"><a href={project.deployedLink} target="_blank" rel="noreferrer"><p className="side-elements slink">Deployed Link</p></a></div>
                                    <div className="home-repo"><a href={project.github} target="_blank" rel="noreferrer"><p className="side-elements slink">Repo</p></a></div>
                                </div>
                                <div className="box-showcase "><img className="project-pic" src={project.picture} alt="N/A"/></div>
                                <div className="home-comments"><p className="side-elements slink">Comments</p> {project.comments.map((comment)=> {
                                    return(
                                        <div>{comment}</div>
                                    )})}
                                </div>
                            </div>
                        </div>              
                    </div>
                )})}
        </div>
    )
}

export default Home;