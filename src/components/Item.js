import React from "react";

function Item ({data}){
    //console.log(data)
    return(<li key={data.id.toString()}>
        <a className="itemLink" href={data.link}><h2>{data.name} </h2></a>
        <p>{data.desc}</p>
        {data.id}
    </li>)
}

export default Item;