import React from "react";
import ItemList from "./ItemList";

function MainContent({data}){
    return(<div>
        <ItemList data={data} />
    </div>);
}
// 
export default MainContent;