const { Client, GatewayIntentBits } = require("discord.js")
const config = require("./config/default.js")
const { getCommands } = require("./utils/commands/helpers.js")
const { registerEvents } = require("./utils/events/helpers.js")
const attachPresencePicker = require("./utils/functions/pickPresence.js")

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const { commandsCollection, commandsNamePath } = getCommands()
client.commands = commandsCollection
client.commandsPaths = commandsNamePath

attachPresencePicker(client)

registerEvents(client)

client.login(config.bot.token)
