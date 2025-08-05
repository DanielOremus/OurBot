import { MessageFlags } from "discord.js"
import CommandBuilder from "../../utils/commands/CommandBuilder.js"

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
      const resolved = import.meta.resolve(
        interaction.client.commandsPaths[commandName]
      )
      console.log(resolved)

      console.log(import.meta)

      // delete import.meta.constructor__cache[resolved]

      const { default: module } = await import(resolved)

      interaction.client.commands.set(module.data.name, module)

      interaction.reply({
        content: `Command \`${commandName}\` was reloaded successfully!`,
      })
      // const command
      //todo: finish logic
    } catch (error) {
      console.error(error)
      await interaction.reply(
        `There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``
      )
    }
  },
})

export default commandObj.build()
