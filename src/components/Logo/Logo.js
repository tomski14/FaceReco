import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import man from './man.png';


const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
		       <div className="Tilt-inner">
		         <img alt='logo' src={man}/>
		       </div>
		    </Tilt>
		</div>
	);
}


export default Logo;

