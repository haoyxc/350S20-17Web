import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

export default props => 
  <div className='fadein'>
      <div 
        onClick={() => props.removeImage()} 
        className='delete'>
        <FontAwesomeIcon icon={faTimesCircle} size='1x' />
      </div>
      <img className='removable-image' src={props.image} alt='' />
  </div>