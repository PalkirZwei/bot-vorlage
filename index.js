const  { Client, Collection, Intents, DiscordAPIError }  = require("discord.js");
const { clientId, guildId, token } =  require("./data/settings.json");
const { prefix } = require("./data/prefix.json");
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs");
const client = new Client({intents: 32767});

client.on("ready", () =>{
	console.log('ich bin nun online!')
})
/* ❌ - Ab hier wird gecodet - ❌ */
/* ------------------------------- */

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
}); 


client.login(token)
/* ------------------------------- */
/* Versuch 2 - fehler: */
/* PS D:\document\Discord-Server\The Red-Squadron\v13bots\PlanTRS> node index.js
D:\document\Discord-Server\The Red-Squadron\v13bots\PlanTRS\index.js:12
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
                                                                     ^

ReferenceError: commands is not defined
    at Object.<anonymous> (D:\document\Discord-Server\The Red-Squadron\v13bots\PlanTRS\index.js:12:70)
    at Module._compile (node:internal/modules/cjs/loader:1112:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1166:10)
    at Module.load (node:internal/modules/cjs/loader:988:32)
    at Module._load (node:internal/modules/cjs/loader:834:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47

Node.js v18.4.0 
*/