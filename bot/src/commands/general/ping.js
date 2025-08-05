const CommandBuilder = require("../../utils/commands/CommandBuilder.js")

const commandObj = new CommandBuilder({
  name: "ping",
  description: "Replies with pong.",
  executeFunc: async (interaction) => {
    await interaction.reply("Pong!")
  },
})

module.exports = commandObj.build()
