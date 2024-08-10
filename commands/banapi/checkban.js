const { SlashCommandBuilder } = require('discord.js');
const fetchUserRestrictions = require('../../cloudmodules/cloud-api-get.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('checkban')
		.setDescription('Check if a user id has any active bans.')
        .addIntegerOption(option => 
            option.setName('userid')
                .setDescription('User ID to check bans for.')
                .setRequired(true)),
	async execute(interaction) {
        const userid = interaction.options.getInteger('userid');

        const bannedUserIds = [];
        let nextPageToken = '';
        do {
            const responseData = await fetchUserRestrictions(nextPageToken);
            nextPageToken = responseData.nextPageToken; 
            
            responseData.userRestrictions.forEach(restriction => {
                const userId = restriction.user.split('/')[1];
                bannedUserIds.push(userId);
            });

        } while (nextPageToken);
        
        if (bannedUserIds.includes(userid.toString())) {
            interaction.reply(`User ID ${userid} has an active ban.`);
        } else {
            interaction.reply(`User ID ${userid} does not have an active ban.`);
        }

    },
};