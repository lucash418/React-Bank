import React from 'react';
import { Link } from 'react-router-dom';

import './style.css';

const ProfileLinks = (props) => {
   const links = props.links.map((link, index) => {
      return (
         <SingleLink 
            key={index} 
            href={link.href} 
            text={link.text}
            icon={link.icon} /> 
      )
   });

   return <section className="profile-links">{links}</section>;
}

const SingleLink = (props) => {
   return (
      <Link to={props.href}>
         <i className={props.icon}></i>
         <span>{props.text}</span>
      </Link>
   );
}

export default ProfileLinks;