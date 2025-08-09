const CommandBuilder = require("../../utils/commands/CommandBuilder.js")
const { EmbedBuilder, MessageFlags } = require("discord.js")

function buildCommandsFieldList(commandsCollection) {
  const list = []
  for (const [key, command] of commandsCollection) {
    const commandData = command.data
    list.push({
      name: `/${commandData.name}`,
      value: `┗ ${commandData.description}`,
    })
  }
  return list
}

function buildEmbed(commandsCollection) {
  const embed = new EmbedBuilder()

  embed.setColor("DarkPurple")
  embed.setTitle("Available commands:")
  embed.setDescription("Here you can see a list of all commands.")

  const commandsList = buildCommandsFieldList(commandsCollection)

  embed.addFields(commandsList)

  return embed
}

const commandObj = new CommandBuilder({
  name: "help",
  description: "Shows info about existing commands",
  executeFunc: async (interaction) => {
    const embed = buildEmbed(interaction.client.commands)

    await interaction.reply({
      embeds: [embed],
      flags: [MessageFlags.Ephemeral],
    })
  },
}).build()

module.exports = commandObj
