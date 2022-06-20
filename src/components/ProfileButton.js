import React from "react";

export function ProfileButton({icon,iconName,onClick,active,clickActiveProfileButton}){
    return(<li className={active ? "activeProfileButton":"profileButton"} onClick={active ? clickActiveProfileButton : onClick}><img src={icon} alt={iconName}></img></li>)
}

export default ProfileButton