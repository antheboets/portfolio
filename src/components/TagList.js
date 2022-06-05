import React from "react";
import Tag from "./Tag";

function TagList({languages, commits, site, link,topics}){

    //keys
    return (<div>
        <ul>
            {<Tag text={site.name} icon={site.icon}/>}
            <Tag key={`${link}${commits}`} text={`Commits ${commits}`}/>
            {languages.list.map((language)=>{return <Tag key={`${language.name}${language.value}`} text={`${language.name} ${language.percent}`}/>})}
            {topics.map((topic)=>{return <Tag key={`${link}${topic}`} text={topic}/>})}
        </ul>
    </div>)
}

TagList.defaultProps = {
    languages: {list:[]},
    topics: []
}

export default TagList;