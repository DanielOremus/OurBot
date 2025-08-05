const { MessageFlags } = require("discord.js")
const CommandBuilder = require("../../utils/commands/CommandBuilder")

const commandObj = new CommandBuilder({
  name: "reload",
  description: "Reloads a command",
  options: [
    {
      type: "string",
      name: "command",
      description: "Command to reload.",
      required: true,
    },
  ],
  executeFunc: async (interaction) => {
    const commandName = interaction.options
      .getString("command", true)
      .toLowerCase()
      .trim()

    const command = interaction.client.commands.get(commandName)

    if (!command) {
      return interaction.reply({
        content: `❌ Command \`${commandName}\` not found!`,
        flags: MessageFlags.Ephemeral,
      })
    }

    try {
      const modulePath = interaction.client.commandsPaths[commandName]
      delete require.cache?.[modulePath]
      const module = require(modulePath)

      interaction.client.commands.set(module.data.name, module)

      await interaction.reply({
        content: `Command \`${commandName}\` was reloaded successfully!`,
        flags: MessageFlags.Ephemeral,
      })
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: `❌ There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``,
        flags: MessageFlags.Ephemeral,
      })
    }
  },
})

module.exports = commandObj.build()
