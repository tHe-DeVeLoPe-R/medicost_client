
import {useMediaQuery} from 'react-responsive';
import './Welcome.css'
import logo from '../images/medicost.png';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
   
    const navigate = useNavigate();
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });

  return (
     isMobile ? (<div className='welcome-main'>
         <img className='welcome-logo' src= {logo} alt="logo" /> 
         <small style={{'color':'grey'}}>v 1.0.1</small>
         <h1>Welcome here</h1>
         <p className='welcome-para'>
         Imagine walking into a pharmacy, unsure of how much your prescription will cost. With MediCost, you can avoid this uncertainty. <br /> <br /> Simply enter your medications, and the app provides real-time price estimates, so you know exactly what to expect before you even leave home. No surprises, no second trips—just peace of mind.
         </p> <br />
         <button onClick={()=>{
            navigate('/start')
         }}  className='kickstart-mobile'> Kick Start </button> <br />

         <button className='touch-mobile'> Get in touch | Linkedin </button> <br />

    </div>) :
    
    // Design for web
    
    <div className='welcome-main-web'>
           <h1>Welcome To Medicost</h1> <br /> 
           <img className='welcome-logo' src= {logo} alt="logo" /> 
           <p className='welcome-para'>
         Imagine walking into a pharmacy, unsure of how much your prescription will cost. With MediCost, you can avoid this uncertainty. <br /> <br /> Simply enter your medications, and the app provides real-time price estimates, so you know exactly what to expect before you even leave home. No surprises, no second trips—just peace of mind.
         </p> <br />

         <button onClick={()=>{
            navigate('/start', {replace: true})
         }} className='kickstart'> KickStart </button>
    </div>
  )
}
