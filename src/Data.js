import tokens from "./tokens"

//Profiles multi use met zelfde pointer
export const Data = {
    Profiles:{
        PortfolioProfile:{
            avatarUrl:"",
            bio:"",
            iconPath:"portfolio/briefcase.png",
            iconAlt:"Portfolio",
            order:0
        },
        YoutubeProfile:{
            avatarUrl:"",
            bio:"",
            iconPath:"portfolio/youtube.png",
            iconAlt:"Youtube",
            order:2
        },
        GithubProfile:{
            avatarUrl:"",
            bio:"",
            iconPath:"portfolio/github.png",
            iconAlt:"Github",
            order:1
        },
    },
    fetchRequests:{
        fetchGithubProfile:{
            resource:"https://api.github.com/users/antheboets",
            init:{
                method:"GET",
                headers:{
                    authorization:tokens.githubAccessToken,
                    accept:"application/vnd.github.v3+json"
                }
            }
        },
        fetchYoutubeProfile:{
            resource:`https://www.googleapis.com/youtube/v3/channels?part=${"snippet%2CcontentDetails%2Cstatistics"}&id=${tokens.youtubeChannelId}&key=${tokens.googleApiKey}`,
            init:{
                methode:"GET",
                headers:{
                    Accept:"application/json"
                }
            }
        },
        GithubRepos:{
            resource:`https://api.github.com/users/antheboets/repos?per_page=${100}&page=${1}`,
            init:{
                method:"GET",
                headers:{
                    accept:"application/vnd.github.v3+json",
                    authorization:tokens.githubAccessToken
                }
            }
        },
        GithubContributors:{
            resource:"",
            init:{
                method:"GET",
                headers:{
                    accept:"application/vnd.github.v3+json",
                    authorization:tokens.githubAccessToken
                }
            }
        },
        GithubLanguages:{
            resource:"",
            headers:{
                method:"GET",
                headers:{
                    accept:"application/vnd.github.v3+json",
                    authorization:tokens.githubAccessToken
                }
            }
        }
    },
    ReposSites:{
        github:{
            name:"Github",
            icon:"portfolio/github.png"
        }
    }
}
export default Data