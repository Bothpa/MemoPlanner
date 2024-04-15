const axios = require('axios');

const GitHubApi = async(access_token) => {
    try{
        const response = await axios.get(`https://api.github.com/user`, {
            headers: { Authorization: `token ${access_token}` },
          });
          if(response){
            return response.data.login
          }
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    GitHubApi
};