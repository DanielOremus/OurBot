import CommandBuilder from "../../utils/commands/CommandBuilder.js"

const commandObj = new CommandBuilder({
  name: "say",
  description: "Say something",
  options: [
    {
      type: "string",
      name: "message",
      description: "Message to say",
      required: true,
    },
    {
      type: "boolean",
      name: "shout",
      description: "Shout it?",
      required: false,
    },
  ],
  executeFunc: async (interaction) => {
    const msg = interaction.options.getString("message")
    const shout = interaction.options.getBoolean("shout") ?? false
    await interaction.reply(shout ? msg.toUpperCase() : msg)
  },
})

export default commandObj.build()
