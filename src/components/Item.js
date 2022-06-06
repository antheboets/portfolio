import React from "react";
import TagList from "./TagList";

function Item ({data}){
    
    return(<li className="repoItem" key={data.id.toString()}>
        <a className="itemLink" href={data.link}><h2>{data.name} </h2></a>
        <p>{data.desc}</p>
        <TagList languages={data.lang} site={data.site} commits={data.commits.commits} topics={data.topics} link={data.link} archived={data.archived} />
    </li>)
}

export default Item;