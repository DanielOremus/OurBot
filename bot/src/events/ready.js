const { Events } = require("discord.js")

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`)
    client.pickPresence()
    setInterval(() => client.pickPresence(), 1000 * 600)
  },
}
