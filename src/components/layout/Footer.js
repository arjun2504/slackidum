import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-light bg-white navbar-fixed-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <ul className="footer-links float-left">
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-6">
                        <p className="float-right"><i className="fas fa-copyright"></i> 2019 Slackidum</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
