const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const updateUserRestriction = require('../../cloudmodules/cloud-api-ban.js')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Bans a roblox ID.')
		.addIntegerOption(option => 
			option.setName('userid')
				.setDescription('Target roblox user id.')
				.setRequired(true))
		.addIntegerOption(option => 
			option.setName('duration')
				.setDescription('Duration in days. Leave empty for permanent ban.'))
		.addStringOption(option => 
			option.setName('pubreason')
				.setDescription('Public reason for the ban.'))
		.addStringOption(option => 
			option.setName('privreason')
				.setDescription('Private reason for the ban.'))
		.addBooleanOption(option =>
			option.setName('exalts')
				.setDescription('Exclude known user alts from the ban. (Y/N)')
		),
	async execute(interaction) {
		const userid = interaction.options.getInteger('userid');						
		const duration = interaction.options.getInteger('duration') * 86400;	
		const pubreason = interaction.options.getString('pubreason') ?? "No reason specified";				
		const privreason = interaction.options.getString('privreason') ?? "No reason specified";						
		const exalts = interaction.options.getBoolean('exalts') ?? true; // Default exclude alts true
		const author = interaction.user;					

		try {
			const stausCode = await updateUserRestriction(true, userid,duration,privreason,pubreason,exalts);
			if (stausCode === 200) {
				const embed = new EmbedBuilder()
				.setTitle(`ID: ${userid} has successfuly been banned.`)
				.addFields(
					{
					name: "Ban Duration:",
					value: duration > 0 ? `\`\`\`${duration/86400} days\`\`\`` : "```Permanently Banned```",
					inline: false
					},
					{
					name: "Banned by:",
					value: "```"+ `${author.username}` + ' | Discord ID:' + ` ${author.id}` +"```",
					inline: false
					},
					{
					name: "Reason:",
					value: "```"+ 'Banned for: ' +`${privreason}` + "```",
					inline: false
					},
					{
					name: "Exclude Known User Alt Accounts:",
					value: "```" + `${exalts}` + "```",
					inline: false
					},
				)
				.setColor("#ff3333")
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