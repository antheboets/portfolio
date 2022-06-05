import React from "react";
import TagList from "./TagList";

function Item ({data}){
    console.log(data)
    return(<li key={data.id.toString()}>
        <a className="itemLink" href={data.link}><h2>{data.name} </h2></a>
        <p>{data.desc}</p>
        <TagList languages={data.lang} site={data.site} commits={data.commits.commits} link={data.link} />
    </li>)
}

export default Item;