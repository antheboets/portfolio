import React from "react";
import ProfileButton from "./ProfileButton";

export function ProfileButtonList ({profileData,currentProfile,stopTimer,setCurrentProfile}){

    //delete for key
    let key = 0

    const clickProfileButton = (profile)=>{
        stopTimer()
        setCurrentProfile(profile)
    }

    //maybe doest work
    const clickActiveProfileButton = () =>{
        stopTimer()
    }


    return(<ul>
        {profileData.map((profile)=>{
            key++
            return <ProfileButton key={`${profile.iconAlt}${key}`} active={currentProfile === profileData[key]} icon={profile.iconPath} iconName={profile.iconAlt} clickActiveProfileButton={clickActiveProfileButton} onClick={()=>{clickProfileButton(profile)}}/> 
        })}</ul>)
}

export default ProfileButtonList