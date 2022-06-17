import React from "react";
import ProfileButtonList from "./ProfileButtonList";

function Profile ({profileData,seconds}){

    const [currentData, setCurrentData] = React.useState(profileData[0]);
    const [currentPos, setCurrentPos] = React.useState(0);
    const [activeTimer, setActiveTimer] = React.useState(true)

    React.useEffect(()=>{
        console.log(profileData,"profile data updated")
    },[profileData])

    React.useEffect(()=>{
        setTimeout(()=>{
            if(profileData.length > 1){
                if(currentPos < profileData.length -1){
                    setCurrentPos(currentPos + 1)
                }
                else{
                    setCurrentPos(0)
                }
                console.log(activeTimer)
                setCurrentData(profileData[currentPos])
            }    
        },1000 * seconds)
    },[currentPos,activeTimer])

    const stopTimer = ()=>{
        setActiveTimer(false)
    }
    const startTimer = ()=>{
        setActiveTimer(true)
    }

    const setCurrentProfile = (profile)=>{
        setCurrentData(profile)
        //setCurrentPos()
    }

    return(<div onDoubleClick={startTimer}>
            <img src={currentData.avatarUrl}/>
            <p>{currentData.bio}</p>
            {currentPos} {profileData.length}
            <ProfileButtonList profileData={profileData} currentProfile={currentData} stopTimer={stopTimer} setCurrentProfile={setCurrentProfile} />
            <button onClick={startTimer}>start</button>
            <button onClick={stopTimer}>stop</button>
        </div>);
}
export default Profile;