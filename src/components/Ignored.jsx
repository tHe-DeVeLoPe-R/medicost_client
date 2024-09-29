import React from 'react';
import './Ignored.css'
import { useNavigate } from 'react-router-dom';
import logo from '../images/medicost.png';

export default function Ignored() {

    const navigate = useNavigate();
  return (
    <div className="ignored-message">
         <img className='welcome-logo' src={logo} alt="logo" />
      <h2>Medicine Not Recognized</h2>
      <p>
        We strive to ensure our system provides accurate and up-to-date pricing information for all medications. However, the medicine you entered could not be matched with our current database. This might occur if the medication is newly introduced, has an uncommon name, or if there is a slight variation in the spelling. 
        <br /><br />
        We encourage you to double-check the name and try again. If the issue persists, feel free to contact our support team so we can assist you further. Our goal is to continuously improve our database to serve you better. Thank you for your understanding. You can find our contact gmail at <a style={{'color':'#522546'}} onClick={()=>{navigate('/policy')}}>terms and services page</a>
      </p>
    </div>
  );
}
