const axios = require('axios').default
const { UNIVERSE_ID, OPENCLOUD_KEY } = require('../config.json')

async function messageSend(Message, Topic) {

    try {
        const response = await axios.post(
            `https://apis.roblox.com/messaging-service/v1/universes/${UNIVERSE_ID}/topics/${Topic}`,
            {
                'message': Message
            },
            {
                headers: {
                    'x-api-key': OPENCLOUD_KEY,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.status;

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw error;
      }
}

module.exports = messageSend;