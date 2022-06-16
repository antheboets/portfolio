import React from "react";

export function ProfileButton({icon,iconName,onClick,active}){
    return(<li className={active ? "activeProfileButton":"profileButton"} onClick={onClick}><img src={icon} alt={iconName}></img></li>)
}

export default ProfileButton