import CommandBuilder from "../../utils/commands/CommandBuilder.js"

const commandObj = new CommandBuilder({
  name: "ping",
  description: "Replies with 'pong'",
  executeFunc: async (interaction) => {
    await interaction.reply("Pong!")
  },
}).build()

export default commandObj
