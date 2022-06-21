import React from "react";
import ItemList from "./ItemList";

function MainContent({data}){
    return(<div className="mainContent">
        <ItemList data={data} />
    </div>);
}
// 
export default MainContent;