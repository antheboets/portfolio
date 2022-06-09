import React from "react";

function Tag({text,icon}){
    return (<li className="tag">{icon !== undefined && <img src={icon} height="16px" width="16px" alt={`${text} logo`} />}
    {text}
    </li>);

}
export default Tag;