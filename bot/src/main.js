import { Client, GatewayIntentBits } from "discord.js"
import { default as config } from "./config/default.js"
import { getCommands } from "./utils/commands/helpers.js"
import { registerEvents } from "./utils/events/helpers.js"
import attachPresencePicker from "./utils/functions/pickPresence.js"

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const { commandsCollection, commandsNamePath } = await getCommands()
client.commands = commandsCollection
client.commandsPaths = commandsNamePath

attachPresencePicker(client)

await registerEvents(client)

client.login(config.bot.token)
