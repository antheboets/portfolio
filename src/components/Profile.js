import React from "react";
import ProfileButtonList from "./ProfileButtonList";

function Profile ({profileData,seconds}){

    const [currentData, setCurrentData] = React.useState(profileData[0]);
    const [currentPos, setCurrentPos] = React.useState(0);
    const [activeTimer, setActiveTimer] = React.useState(true)

    React.useEffect(()=>{
        console.log(profileData,"profile data updated")
    },[profileData])

    //https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
    React.useEffect(()=>{
        let interval = null
        if(activeTimer){
            interval = setInterval(()=>{
                if(profileData.length > 1){
                    if(currentPos < profileData.length - 1){
                        //plus one because currentPos doesnt update in this interval
                        setCurrentPos(currentPos + 1)
                        setCurrentData(profileData[currentPos + 1])
                    }
                    else{
                        setCurrentPos(0)
                        setCurrentData(profileData[0])
                    }
                }   
            },1000 * seconds)
        }
        return () =>{ clearInterval(interval)}
    },[currentPos,activeTimer])

    const stopTimer = ()=>{
        setActiveTimer(false)
    }
    const startTimer = ()=>{
        setActiveTimer(true)
    }

    const setCurrentProfile = (profile)=>{
        setCurrentData(profile)
        for(let i = 0; i < profileData.length;i++){
            if(profile === profileData[i]){
                setCurrentPos(i)
            }
        }
        //maybe bad code
        if(currentData !== profileData[currentPos]){
            setCurrentData(profileData[0])
            setCurrentPos(0)
        }
        
    }

    return(<div onDoubleClick={startTimer}>
            <img src={currentData.avatarUrl}/>
            <p>{currentData.bio}</p>
            {currentPos} {profileData.length}
            <ProfileButtonList profileData={profileData} currentProfile={currentData} stopTimer={stopTimer} setCurrentProfile={setCurrentProfile} />
        </div>);
}
export default Profile;