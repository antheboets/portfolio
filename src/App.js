import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import React from 'react';
import Data from './Data.js';

function  App() {

  const ignoreList = [225449624,231742306,169811023,488670310,214025326,400524383,225458518];

  const [profileData] = React.useState([Data.Profiles.GithubProfile]);
  const [items, setItems] = React.useState([])

  const formatString = (str) =>{
    return str.replace(/-|_/g," ")
  }

  const fetchGithubProfile = async ()=>{
    const res = await fetch(Data.fetchRequests.fetchGithubProfile.url,Data.fetchRequests.fetchGithubProfile.init);
    return await res.json();
  }
  const fetchYoutubeProfile = async() =>{
    const res = await fetch(Data.fetchRequests.fetchYoutubeProfile.resource,Data.fetchRequests.fetchYoutubeProfile.init)
    return await res.json();
  }
  const addProfileToList = (profile)=>{
    profileData.push(profile)
    profileData.sort((a,b)=>{return a.order - b.order})
  }

  React.useEffect(()=>{
    const addGithubProfile = async() =>{
      const profile = await fetchGithubProfile(Data.fetchRequests.GithubRepos.resource,Data.fetchRequests.GithubRepos.int)
      const defaultProfile = Data.Profiles.GithubProfile
      defaultProfile.avatarUrl = profile.avatar_url
      defaultProfile.bio = profile.bio
      addProfileToList(defaultProfile)
    }
    const addYoutubeProfile = async()=>{
      const profile = await fetchYoutubeProfile()
      const defaultProfile = Data.Profiles.YoutubeProfile
      defaultProfile.avatarUrl = profile.items[0].snippet.thumbnails.high.url
      defaultProfile.bio = profile.items[0].snippet.localized.description
      addProfileToList(defaultProfile)
    }
    const getRepos = async () => {
      const res = await fetch()
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
        return fetch(item.contributors_url,Data.fetchRequests.GithubContributors.init).then(async (res)=>{return {id:item.id,commitObj:await res.json()}})
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
        return fetch(item.languages_url,Data.fetchRequests.GithubLanguages.init).then(async (res)=>{return {id:item.id,languageObj:await res.json()}})
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

export default App