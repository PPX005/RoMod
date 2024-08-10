const axios = require('axios');
const { UNIVERSE_ID, OPENCLOUD_KEY } = require('../config.json');

async function updateUserRestriction(action, userid, duration, privateReason, displayReason, excludeAlts) {
  const url = `https://apis.roblox.com/cloud/v2/universes/${UNIVERSE_ID}/user-restrictions/${userid}`;

  // Initialize the gameJoinRestriction object
  const gameJoinRestriction = {
    active: action, // true = Ban, false = Unban
    privateReason: privateReason,
    displayReason: displayReason,
  };

  // Conditionally add the duration property if it's greater than 0 (otherwise the ban will be permanent)
  if (duration > 0) {
    gameJoinRestriction.duration = `${duration}s`;
  }

  if (excludeAlts !== null){
    gameJoinRestriction.excludeAlts = excludeAlts;
  }

  const data = {
    gameJoinRestriction: gameJoinRestriction
  };

  const config = {
    headers: {
      'x-api-key': `${OPENCLOUD_KEY}`,
      'Content-Type': 'application/json',
    }
  };

  try {
    const response = await axios.patch(url, data, config);
    return response.status;
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    throw error;
  }
}

module.exports = updateUserRestriction;
