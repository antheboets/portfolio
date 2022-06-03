import React from "react";

function Profile ({profileData}){


    const [currentData, setCurrentData] = React.useState(profileData[0]);
    const [currentPos, setCurrentPos] = React.useState(0);

    console.log(profileData,profileData.length,profileData[1])

    React.useEffect(()=>{
        console.log("profile update",profileData.length)
    },[profileData])


    React.useEffect(()=>{
        setTimeout(()=>{
            if(profileData.length > 1){
                if(currentPos < profileData.length -1){
                    setCurrentPos(currentPos + 1)
                    console.log("a")
                }
                else{
                    setCurrentPos(0)
                    console.log("b")
                }
                setCurrentData(profileData[currentPos])
            }
        },1000 * 10)
    })

    return(<div>
            <img src={currentData.avatarUrl}/>
            <p>{currentData.bio}</p>
            {currentPos} {profileData.length}
        </div>);
}
export default Profile;