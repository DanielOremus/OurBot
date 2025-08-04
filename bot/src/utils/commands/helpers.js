import path from "path"
import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url"
import { REST, Routes, Collection } from "discord.js"
import { default as config } from "../../config/default.js"

//TODO: refactor code
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getCommands = async () => {
  const commandsArr = []
  const commandsCollection = new Collection()
  const foldersPath = path.join(__dirname, "../../commands")

  const folders = fs.readdirSync(foldersPath, { withFileTypes: true })

  for (const folder of folders) {
    if (!folder.isDirectory()) continue
    const filesPath = path.join(foldersPath, folder.name)

    const files = fs.readdirSync(filesPath)
    for (const file of files) {
      if (!file.endsWith(".js")) continue
      const commandPath = path.join(filesPath, file)
      const { default: command } = await import(pathToFileURL(commandPath))

      if (!command.data || !command.execute) {
        console.log(
          `[WARNING] The command at ${file} is missing a required "data" or "execute" property.`
        )
        continue
      }

      commandsArr.push(command)
      commandsCollection.set(command.data.name, command)
    }
  }

  return { commandsArr, commandsCollection }
}

export const registerCommands = async (commandsArr) => {
  try {
    console.log(
      `Started refreshing ${commandsArr.length} application (/) commands.`
    )

    const rest = new REST().setToken(config.bot.token)

    const data = await rest.put(
      Routes.applicationGuildCommands(config.bot.clientId, config.bot.guildId),
      { body: commandsArr.map((c) => c.data.toJSON()) }
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
}
