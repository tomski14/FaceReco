import React from 'react';
import './ImageLinkForm.css';



const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
		<p className ='f3'> {'this App will detect Faces'}	</p>
		<div className='center'>
				<div className = 'form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' placeholder='place here your pic URL' type='text' onChange={onInputChange} />
					<button className='f4  w-30 grow link ph3 pv2 dib white bg-light-red' onClick={onButtonSubmit}>{'ENTER'}</button>
				</div>
		</div>


		</div>
		
	);
}


export default ImageLinkForm;

