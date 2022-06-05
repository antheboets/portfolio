import React from "react";

function Tag({text,icon}){
    return (<li>{icon !== undefined && <img src={icon} alt={`${text} logo`} /> }{text}</li>);

}
export default Tag;