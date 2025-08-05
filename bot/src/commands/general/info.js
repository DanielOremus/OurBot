import { EmbedBuilder, MessageFlags } from "discord.js"
import CommandBuilder from "../../utils/commands/CommandBuilder.js"

const commandObj = new CommandBuilder({
  name: "info",
  description: "Displays information about bot and creators.",
  executeFunc: async (interaction) => {
    const embed = new EmbedBuilder()
    embed
      .setColor("DarkPurple")
      .setTitle("General Information")
      .setDescription("Here you can read info about our bot and us")

    interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral })
  },
})

export default commandObj.build()
