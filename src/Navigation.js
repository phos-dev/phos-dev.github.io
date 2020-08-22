import React from 'react';
import logo from './logo.png';
import './Navigation.css';
const Navigation = () => {
    return (
        <div className="navigation">
            <img height="120px" width="auto" src={logo}/>
            <h1>
                Face Recognition
                <div className="sub">
                    using Clarifai's api.
                </div> 
            </h1>
        </div>
    );
}
export default Navigation;