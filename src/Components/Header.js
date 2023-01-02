import React from 'react'
import { Link } from 'react-router-dom'

function Header(){
    return(
        <div className="container-header">
            <div className="box-header">
                <span className="link-home">
                    <Link style={{textDecoration: "none"}} to="/">
                        Home
                    </Link>
                </span>
                <span className="link-account">
                    <Link style={{textDecoration: "none"}} to="/accounts/:id">
                        My Account
                    </Link>
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