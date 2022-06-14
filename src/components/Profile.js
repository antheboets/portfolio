import React from "react";

function Profile ({profileData,seconds}){


    const [currentData, setCurrentData] = React.useState(profileData[0]);
    const [currentPos, setCurrentPos] = React.useState(0);

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
                setCurrentData(profileData[currentPos])
            }
        },1000 * seconds)
    })

    return(<div>
            <img src={currentData.avatarUrl}/>
            <p>{currentData.bio}</p>
            {currentPos} {profileData.length}
            
        </div>);
}
export default Profile;