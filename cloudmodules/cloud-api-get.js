const axios = require('axios');
const { UNIVERSE_ID, OPENCLOUD_KEY } = require('../config.json')

async function fetchUserRestrictions(nextPageToken = '') {
  let url = `https://apis.roblox.com/cloud/v2/universes/${UNIVERSE_ID}/user-restrictions?maxPageSize=10`;
  if (nextPageToken) {
      url += `&pageToken=${nextPageToken}`;
  }

  try {
    const response = await axios.get(url, {
      headers: {
          'x-api-key': `${OPENCLOUD_KEY}`
      }})
    return response.data;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}
  
  module.exports = fetchUserRestrictions;