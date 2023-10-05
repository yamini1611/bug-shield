import React from "react";
import video from '../Assets/Images/video (2160p).mp4';
import '../Styles/User.css';

const Home = () => {
    return (

        <div id="homediv" className="conatiner-fluid">
            <video className="" autoPlay loop muted id="home-bg-video">
                <source src={video} type="video/mp4"></source>
            </video>
            <div className="row">

                <div className="overlay">
                    <h3 className="text-center ms-3 " id="headline">Errors Reshaped, Solutions Unleashed</h3>

                </div>
            </div>

        </div>
    )
}

export default Home;