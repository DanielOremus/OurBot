import { Client, Events, MessageFlags, GatewayIntentBits } from "discord.js"
import { default as config } from "./config/default.js"
import { getCommands } from "./utils/commands/helpers.js"
import { registerEvents } from "./utils/events/helpers.js"

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const { commandsCollection } = await getCommands()
client.commands = commandsCollection

await registerEvents(client)

client.login(config.bot.token)
