import { useMediaQuery } from 'react-responsive';
import './Welcome.css';
import logo from '../images/medicost.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Welcome() {
   const navigate = useNavigate();
   const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

   // State for checkbox and warning
   const [isChecked, setIsChecked] = useState(false);
   const [showWarning, setShowWarning] = useState(false);

   // Function to toggle checkbox
   const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
      setShowWarning(false); // Reset warning when checkbox is toggled
   };

   // Function to handle the Start button click
   const handleStartClick = () => {
      if (isChecked) {
         navigate('/start');
      } else {
         setShowWarning(true); // Show warning message if not checked
      }
   };

   return (
      isMobile ? (
         <div className='welcome-main'>
            <img className='welcome-logo' src={logo} alt="logo" />
            <small style={{ color: 'grey' }}>v 1.0.1</small>
            <h1>Welcome here</h1>
            <p className='welcome-para'>
               Imagine walking into a pharmacy, unsure of how much your prescription will cost. With MediCost, you can avoid this uncertainty. <br /><br />
               Simply enter your medications, and the app provides real-time price estimates, so you know exactly what to expect before you even leave home. No surprises, no second trips—just peace of mind.
            </p>
            <br />

            <button onClick={handleStartClick} className='kickstart-mobile'>
               Kick Start
            </button>
            <br />

            <button className='touch-mobile'> Get in touch | Linkedin </button>
            <br />

            {/* Checkbox and policy link below the buttons */}
            <div className='policy-container'>
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
               />
               <label onClick={() => navigate('/policy')}>
                  Accept working policy of the app
               </label>
            </div>

            {/* Warning message */}
            {showWarning && <p style={{'color':'red'}}>Please accept the working policy first.</p>}
         </div>
      ) : (
         // Design for web
         <div className='welcome-main-web'>
            <h1>Welcome To Medicost</h1>
            <br />
            <img className='welcome-logo' src={logo} alt="logo" />
            <p className='welcome-para'>
               Imagine walking into a pharmacy, unsure of how much your prescription will cost. With MediCost, you can avoid this uncertainty. <br /><br />
               Simply enter your medications, and the app provides real-time price estimates, so you know exactly what to expect before you even leave home. No surprises, no second trips—just peace of mind.
            </p>
            <br />

            <button onClick={handleStartClick} className='kickstart'>
               Kick Start
            </button>
            <br />

            {/* Checkbox and policy link below the button */}
            <div className='policy-container'>
               <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
               />
               <label onClick={() => navigate('/policy')}>
                  Accept working policy of the app
               </label>
            </div>

            {/* Warning message */}
            {showWarning && <p>Please accept the working policy first.</p>}

         </div>
      )
   );
}
