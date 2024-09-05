const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const messageSend = require('../../cloudmodules/cloud-api-ms.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription('Send a message to live chat ingame')
		.addStringOption(option => 
			option.setName('message')
				.setDescription('Message content')
				.setRequired(true))
		.addBooleanOption(option => 
			option.setName('private')
				.setDescription('Display author name')),
	async execute(interaction) {
		const message = interaction.options.getString('message');
		const private = interaction.options.getBoolean('private');
        const author = interaction.user.username;

		const content = JSON.stringify({'Message' : message, 'Private' :private, 'Author' : author})

		try {
			const stausCode = await messageSend(content,"MessageSignal",interaction);
			if (stausCode === 200) {
				const embed = new EmbedBuilder()
				.setTitle(`Message has been successfully sent!`)
				.addFields(
					{
					name: "Message sent by:",
					value: "```"+ `${author.username}` + ' | Discord ID:' + ` ${author.id}` +"```",
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
				await interaction.reply(`There was a problem while sending a message to the chat. Code: ${stausCode}`, ephemeral=true)
			}
		} catch (error) {
			console.error(error);
		}
        
	},
};