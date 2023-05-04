
import data from '../tcc_ceds_music.json';
//import user_history from '../user_likes.json';
const fs = require('fs')


const getSongs = async ()   =>{    
    return (data)
}

const getUserHistory = async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const user_history = await fetch('https://spurious-ivory-surfboard.glitch.me/user-history', options);
  const json_user_history = await user_history.json();

  return json_user_history;
}

const saveUserHistoryToFile = async (userHistory) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userHistory)
  };
  console.log(userHistory)
  const response = await fetch('https://spurious-ivory-surfboard.glitch.me/', options);
  const result = await response.text();

  console.log(result);
};


const getSelectedSongs=  (selectedSongIds) =>{
 
    const selectedSongs = data.filter(song => selectedSongIds.includes(song.song_id));
   
    return selectedSongs
}

export { getSongs ,getUserHistory,saveUserHistoryToFile,getSelectedSongs};