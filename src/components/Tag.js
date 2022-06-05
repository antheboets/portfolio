import React from "react";

function Tag({text,icon}){
    return (<li>{icon !== undefined && <img src={icon} height="20px" width="20px" alt={`${text} logo`} /> }{text}</li>);

}
export default Tag;