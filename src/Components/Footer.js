import React from 'react'
import { BsGithub } from 'react-icons/bs';
import { AiOutlineLinkedin } from 'react-icons/ai';

function Footer(){

    return (
        <div className="container-footer">
            <div className="box-links">
                Creator: Hamza Ali 
                <a href="https://github.com/shamzaali7" target="_blank" rel="noreferrer"><BsGithub/></a>
                <a href="https://www.linkedin.com/in/hamza-ali7/" target="_blank" rel="noreferrer">< AiOutlineLinkedin/></a>
            </div>
        </div>
    );
}

export default Footer;