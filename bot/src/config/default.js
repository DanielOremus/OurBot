import "dotenv/config"

export default Object.freeze({
  bot: {
    token: process.env.TOKEN,
    guildId: process.env.GUILD_ID,
    clientId: process.env.CLIENT_ID,
  },
})
