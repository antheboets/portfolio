import React from "react";
import HeaderItem from "./HeaderItem";
import Profile from "./Profile";

const Header = ({profileData}) => {

    return (<div>
        <h1>Anthe Boets</h1>
        <Profile profileData={profileData} seconds={2}/>
        <HeaderItem />
    </div>);
};

export default Header