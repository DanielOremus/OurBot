const path = require("path")
const { REST, Routes, Collection } = require("discord.js")
const config = require("../../config/default.js")
const { getFiles } = require("../functions/filesHelper.js")

exports.getCommands = () => {
  const commandsArr = []
  const commandsCollection = new Collection()
  const commandsNamePath = {}

  const commandFolderPath = path.join(__dirname, "../../commands")
  const commandFiles = getFiles(commandFolderPath)

  for (const file of commandFiles) {
    const command = require(file.path)

    if (!command.data || !command.execute) {
      console.log(
        `[WARNING] The command at ${file.name} is missing a required "data" or "execute" property.`
      )
      continue
    }

    commandsArr.push(command)
    commandsCollection.set(command.data.name, command)
    commandsNamePath[command.data.name] = file.path
  }
  return { commandsArr, commandsCollection, commandsNamePath }
}

exports.registerCommands = async (commandsArr) => {
  try {
    console.log(`Started refreshing ${commandsArr.length} application (/) commands.`)

    const rest = new REST().setToken(config.bot.token)

    const data = await rest.put(
      Routes.applicationGuildCommands(config.bot.clientId, config.bot.guildId),
      { body: commandsArr.map((c) => c.data.toJSON()) }
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
}
