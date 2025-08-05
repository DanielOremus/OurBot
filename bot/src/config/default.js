require("dotenv").config({ quiet: true })

module.exports = Object.freeze({
  bot: {
    token: process.env.TOKEN,
    guildId: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
  },
})
