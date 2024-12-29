import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';


const Home = () => {
    const navigate = useNavigate(); 

    return (
        <div className="home">
            <img 
                src={process.env.PUBLIC_URL + '/images/home-image.png'} 
                alt="Decorative" 
            />
            <div className="home-text">
                <h1>Your Ultimate Days Calculator</h1>
                <p>
                    Easily calculate the number of days, months, and years between two dates.
                </p>
                <button className="calculator-button" onClick={() => navigate('/date-calculator')}>
                    Go to Calculator &#x27F6;
                   
                </button>
            </div>
        </div>
    );
};

export default Home;