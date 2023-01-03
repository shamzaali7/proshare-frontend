import React from 'react'
import { Link } from 'react-router-dom'

function Header(userID){

    return(
        <div className="container-header">
            <div className="box-header">
                <span className="link-home">
                    <Link style={{textDecoration: "none"}} to="/">
                        Home
                    </Link>
                </span>
                <span className="link-account">
                    <a style={{textDecoration: "none"}} href={"/accounts/" + userID.userID}>
                        My Account
                    </a>
                </span>
                <span className="link-ide">
                    <Link style={{textDecoration: "none"}} to="/ide">
                        IDE
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default Header;