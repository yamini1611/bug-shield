import React from "react";
import video from '../Assets/Images/video (2160p).mp4';
import '../User/User.css';

const  Home =() =>
{
return(
    
<div id="homediv" className="conatiner">
<video autoPlay loop muted  id="home-bg-video">
            <source src={video} type="video/mp4"></source>
        </video>
        <div className="overlay">
        <h3 className="text-center" id="headline">Errors Reshaped, Solutions Unleashed</h3>
        
    </div>
</div>
)
}

export default Home;