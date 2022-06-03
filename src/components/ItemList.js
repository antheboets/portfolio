import React from "react";
import Item from "./Item";

export function ItemList({data}){

    return(<div>
        <ul>
            {data.map((item)=>{return <Item key={item.id} data={item}/>})}
        </ul>
    </div>)
}
export default ItemList;