import { Client, Events, MessageFlags, GatewayIntentBits } from "discord.js"
import { default as config } from "./config/default.js"
import { getCommands } from "./utils/commands/helpers.js"

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const { commandsCollection } = await getCommands()
client.commands = commandsCollection

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as: ${readyClient.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      })
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        flags: MessageFlags.Ephemeral,
      })
    }
  }
})

client.login(config.bot.token)
