import CommandBuilder from "../../utils/commands/CommandBuilder.js"
import { MessageFlags } from "discord.js"

const commandObj = new CommandBuilder({
  name: "ping",
  description: "Replies with 'pong'",
  executeFunc: async (interaction) => {
    await interaction.reply({ content: "Pong!", flags: MessageFlags.Ephemeral })
  },
}).build()

export default commandObj
