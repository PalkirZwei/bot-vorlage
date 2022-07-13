const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('testembed'),
	async execute(interaction) {
		let embed = new MessageEmbed()
            .setColor("NAVY")
            .setAuthor({content: "PalkirZWei"})
            .setTitle("Testembed")
            .setDescription("Dies ist ein Test Embed feld, hier gibt es nichts")
            .addField("Test","Test1")
        let btn = new MessageButton()
            .setLabel("Test")
            .setStyle("PRIMARY")
            .setEmoji("⛔")
            .setCustomId("alpha")

        let row = new Discord.MessageActionRow()
            .addComponents(btn)
        interaction.reply({embeds:[embed], components: [row]})
	},
};