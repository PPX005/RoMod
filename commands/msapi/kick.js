const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const messageSend = require('../../cloudmodules/cloud-api-ms.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kicks a roblox ID.')
		.addIntegerOption(option => 
			option.setName('userid')
				.setDescription('Target roblox user id.')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('reason')
				.setDescription('Reason for the kick.')),
	async execute(interaction) {
		const userId = interaction.options.getInteger('userid');
		const reason = interaction.options.getString('reason') ?? 'No reason provided.';
        const author = interaction.user.username;

		const content = JSON.stringify({'UserID' : userId, 'Reason' : reason, 'Author' : author})

		try {
			const stausCode = await messageSend(content,"KickSignal",interaction);
			if (stausCode === 200) {
				const embed = new EmbedBuilder()
				.setTitle(`ID: ${userId} has successfuly been kicked.`)
				.addFields(
					{
					name: "Kicked by:",
					value: "```"+ `${author.username}` + ' | Discord ID:' + ` ${author.id}` +"```",
					inline: false
					},
					{
					name: "Reason:",
					value: "```"+ 'Kicked for: ' +`${reason}` + "```",
					inline: false
					},
				)
				.setColor("#fff300")
				.setFooter({
					text: "Roblox to Discord Bot",
					iconURL: "https://yt3.googleusercontent.com/8v4cfeaFspZv6rdPVHMDtIdMG1nY0gVC0ahzyMsHCwyB6CYlW5K4xj-1ESvYyKmjS1h6TCGj=s160-c-k-c0x00ffffff-no-rj",
				})
				.setTimestamp();

				await interaction.reply({ embeds: [embed] });
			} else if (stausCode == 401 || stausCode == 403){
				interaction.reply("Please make sure the API key has enough permissions, and that your IP / bots IP is authorized on the API. (https://create.roblox.com/dashboard/credentials",
					ephemeral = true
				)
			} else {
				await interaction.reply(`There was a problem while banning this user. Code: ${stausCode}`, ephemeral=true)
			}
		} catch (error) {
			console.error(error);
		}
        
	},
};