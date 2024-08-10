const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const updateUserRestriction = require('../../cloudmodules/cloud-api-ban.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a roblox ID.')
		.addIntegerOption(option => 
			option.setName('userid')
				.setDescription('Target roblox user id.')
				.setRequired(true))
		.addStringOption(option => 
			option.setName('pubreason')
				.setDescription('Public reason for the unban.'))
		.addStringOption(option => 
			option.setName('privreason')
				.setDescription('Private reason for the unban.')),
	async execute(interaction) {
		const userid = interaction.options.getInteger('userid');						
		const pubreason = interaction.options.getString('pubreason') ?? "No reason specified";				
		const privreason = interaction.options.getString('privreason') ?? "No reason specified";	
        
        const author = interaction.user;

		try {
			const stausCode = await updateUserRestriction(false, userid,0,privreason,pubreason,null);
			if (stausCode === 200) {
				const embed = new EmbedBuilder()
				.setTitle(`ID: ${userid} has successfuly been unbanned.`)
				.addFields(
					{
					name: "Unbanned by:",
					value: "```"+ `${author.username}` + ' | Discord ID:' + ` ${author.id}` +"```",
					inline: false
					},
					{
					name: "Reason:",
					value: "```"+ 'Unbanned for: ' +`${privreason}` + "```",
					inline: false
					},
				)
				.setColor("#63ff00")
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
			}
			else{
				await interaction.reply(`There was a problem while banning this user. Code: ${stausCode}`, ephemeral=true)
			}
		} catch (error) {
			console.error(error);
		}
	}, 
};