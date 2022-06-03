import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import React from 'react';

function  App() {

  const ignoreList = [225449624,231742306,169811023,488670310];

  const [userData,setUserData] = React.useState({});
  const [profileDataTest,setProfileData] = React.useState([{avatarUrl:"s",bio:"sa"}]);
  const [items, setItems] = React.useState([])

  const formatString = (str) =>{
    return str.replace(/-|_/g," ")
  }

  const fetchGithubProfile = async ()=>{
    const res = await fetch("https://api.github.com/users/antheboets");
    return await res.json();
  }

  React.useEffect(()=>{
    const test = async() =>{
      const profile = await fetchGithubProfile();
      setUserData(profile);
      setProfileData([...profileDataTest, {avatarUrl:profile.avatar_url,bio:profile.bio}])
    }
    const getRepos = async () => {
      const res = await fetch("https://api.github.com/users/antheboets/repos?per_page=100&page=1",{method:"GET", Header:{accept:"application/vnd.github.v3+json"}})
      const repos = await res.json();
      const repoLanguageData = await Promise.all(repos.map((item) =>{
        return fetch(item.languages_url).then((res)=>{return res.json()})
      })).then((data)=>{
        const obj = []
        data.map((item)=>{
          const languageObj = []
          let totalValue = 0
          Object.keys(item).map((key)=>{
            totalValue += item[key]
          })
          languageObj.totalValue = totalValue
          Object.keys(item).map((key)=>{
            languageObj.push({name:key, value:item[key], percent: totalValue/item[key] * 100})
          })
          obj.push(languageObj)
        })
        return obj
      })

      let data = []
      let iidk = 0
      repos.map((item) =>{
        let obj = {}
        if(!ignoreList.includes(item.id)){
          obj.id = item.id
          obj.desc = item.description
          obj.name = formatString(item.name)
          obj.nameOrignal = item.name
          obj.link = item.html_url
          obj.site = {name:"github",icon:""}
          obj.commits = item.size
          obj.tags = item.topics
          obj.lang = repoLanguageData[iidk]
          iidk++
          data.push(obj)
        }
       
      })

      setItems(data);
    }
    test();
    getRepos();
  },[])

  return (
    <div className="App">
      {userData.bio}
      <Header profileData={profileDataTest}/>
      <MainContent data={items} />
      <Footer/>
    </div>
  );
}

export default App;
