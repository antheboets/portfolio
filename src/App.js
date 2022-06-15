import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import React from 'react';
import tokens from './tokens.js';

function  App() {

  const ignoreList = [225449624,231742306,169811023,488670310,214025326,400524383,225458518];

  const [profileData,setProfileData] = React.useState([{avatarUrl:"s",bio:"sa"}]);
  const [items, setItems] = React.useState([])

  const formatString = (str) =>{
    return str.replace(/-|_/g," ")
  }

  const fetchGithubProfile = async ()=>{
    const res = await fetch("https://api.github.com/users/antheboets",{method:"GET",headers:{authorization:tokens.githubAccessToken,accept:"application/vnd.github.v3+json"}});
    return await res.json();
  }
  const fetchYoutubeProfile = async() =>{
    const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=${"snippet%2CcontentDetails%2Cstatistics"}&id=${tokens.youtubeChannelId}&key=${tokens.googleApiKey}`,{methode:"GET",headers:{Accept:"application/json"}})
    return await res.json();
  }
  const addProfileToList = (profile)=>{
    profileData.push(profile)
  }

  React.useEffect(()=>{
    const addGithubProfile = async() =>{
      const profile = await fetchGithubProfile()
      addProfileToList({avatarUrl:profile.avatar_url,bio:profile.bio})
    }
    const addYoutubeProfile = async()=>{
      const profile = await fetchYoutubeProfile()
      addProfileToList({avatarUrl:profile.items[0].snippet.thumbnails.high.url,bio:profile.items[0].snippet.localized.description})
    }
    const getRepos = async () => {
      const res = await fetch("https://api.github.com/users/antheboets/repos?per_page=100&page=1",{method:"GET", headers:{accept:"application/vnd.github.v3+json",authorization:tokens.githubAccessToken}})
      const repos = await res.json()
      const deleteIndexList = []
      for(let i = repos.length - 1;i > 0; i--){
        let deleteRepo = false
        if(ignoreList.includes(repos[i].id)){
          deleteRepo = true
        }
        if(deleteRepo){
          deleteIndexList.push(i)
        }
      }
      deleteIndexList.forEach((index)=>{repos.splice(index,1)})
      //extra user contributors
      const repoCommitPromise = Promise.all(repos.map((item)=>{
        return fetch(item.contributors_url,{method:"GET", headers:{accept:"application/vnd.github.v3+json",authorization:tokens.githubAccessToken}}).then(async (res)=>{return {id:item.id,commitObj:await res.json()}})
      })).then((data)=>{
        const obj = {}
        data.forEach((item)=>{
          const commitObj = {}
          let commitCount = 0
          item.commitObj.forEach((commits)=>{
            commitCount += commits.contributions
          })
          commitObj.commits = commitCount
          obj[item.id] = commitObj
        })
        return obj
      })
      const repoLanguagePromise = Promise.all(repos.map((item) =>{
        return fetch(item.languages_url,{method:"GET", headers:{accept:"application/vnd.github.v3+json",authorization:tokens.githubAccessToken}}).then(async (res)=>{return {id:item.id,languageObj:await res.json()}})
      })).then((data)=>{
        const obj = {}
        data.forEach((item)=>{
          const languageObj = {}
          languageObj.id = item.id
          let totalValue = 0
          Object.keys(item.languageObj).forEach((key)=>{
            totalValue += item.languageObj[key]
          })
          languageObj.totalValue = totalValue
          languageObj.list = []
          Object.keys(item.languageObj).forEach((key)=>{
            languageObj.list.push({name:key, value:item.languageObj[key], percent: Number(((item.languageObj[key]/totalValue) * 100).toFixed(2))})
          })
          obj[item.id] = languageObj
        })
        return obj
      })
      const dataFromExtraUrls = await Promise.all([repoCommitPromise,repoLanguagePromise])
      const repoCommitData = dataFromExtraUrls[0]
      const repoLanguageData = dataFromExtraUrls[1]
      let data = []
      repos.forEach((item) =>{
        let obj = {}
        obj.id = item.id
        obj.desc = item.description
        obj.name = formatString(item.name)
        obj.nameOrignal = item.name
        obj.link = item.html_url
        obj.site = {name:"Github",icon:"githubIcon.png"}
        obj.commits = repoCommitData[item.id]
        obj.topics = item.topics
        obj.archived = item.archived
        obj.lang = repoLanguageData[item.id]
        delete obj.lang['id']
        data.push(obj)
      })
      setItems(data)
    }
    
    addGithubProfile()
    addYoutubeProfile()
    getRepos()
  },[])

  return (
    <div className="App">
      <Header profileData={profileData}/>
      <MainContent data={items} />
      <Footer/>
    </div>
  );
}

export default App;
