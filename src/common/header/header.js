import React from 'react';
import './header.css';

const Header = (props) => {
    return (
        <div className ="header"><span className="logo">{props.logoName}</span></div>
    )
}

export default Header;