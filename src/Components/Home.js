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
            })
    }
    return(
        <div className="container-home">
            {projects.map((project) => {
                return(
                    <div className="home-projects">
                        <div>Title: {project.title}</div>
                        <div>Deployed Link: <a href={project.deployedLink} target="_blank">{project.deployedLink}</a></div>
                        <div>Repo: <a href={project.github} target="_blank">{project.github}</a></div>
                        <div>Showcase:</div>
                        <div className="container-showcase"> <div></div><div className="showcase"><img src={project.picture}/></div><div></div></div>
                        <div>Comments: {project.comments.map((comment)=> {
                            return(
                                <div>{comment}</div>
                            )
                        })}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default Home;