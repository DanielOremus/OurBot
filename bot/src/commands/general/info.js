const { EmbedBuilder, MessageFlags, AttachmentBuilder } = require("discord.js")
const CommandBuilder = require("../../utils/commands/CommandBuilder.js")
const path = require("path")

const commandObj = new CommandBuilder({
  name: "info",
  description: "Displays information about bot and creators.",
  executeFunc: async (interaction) => {
    const thumbnailPath = path.join(
      __dirname,
      "../../../assets/images/info-thumbnail.png"
    )
    const file = new AttachmentBuilder(thumbnailPath)
    const embed = new EmbedBuilder()
      .setColor("DarkPurple")
      .setTitle("General Information")
      .setDescription("Here you can read info about our bot and us")
      .setThumbnail("attachment://info-thumbnail.png")
      .addFields([
        { name: "\u200B", value: "" },
        {
          name: "Bot Info",
          value:
            "It's our first bot. We develop it just for improving coding skills and for fun.",
        },
        { name: "\u200B", value: "" },
        {
          name: "MCannon",
          value:
            "Junior Vue.js and Node.js developer. Likes doing ballroom dance and watching series.",
          inline: true,
        },
        {
          name: "Ram1ReZ",
          value:
            "Middle-aged man with experience in making Discord Bots via discord.js. A real workaholic.",
          inline: true,
        },
      ])

    await interaction.reply({
      embeds: [embed],
      files: [file],
      flags: MessageFlags.Ephemeral,
    })
  },
})

module.exports = commandObj.build()
