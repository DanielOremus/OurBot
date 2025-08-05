import path from "path"
import fs from "fs"
import { fileURLToPath, pathToFileURL } from "url"
import { REST, Routes, Collection } from "discord.js"
import { default as config } from "../../config/default.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getFilePaths(currentPath, arr = []) {
  const foldersOrFiles = fs.readdirSync(currentPath, { withFileTypes: true })

  for (const folderOrFile of foldersOrFiles) {
    const currPath = path.join(currentPath, folderOrFile.name)
    if (folderOrFile.isDirectory()) getFilePaths(currPath, arr)
    if (folderOrFile.name.endsWith(".js"))
      arr.push({ name: folderOrFile.name, path: pathToFileURL(currPath) })
  }

  return arr
}

export const getCommands = async () => {
  const commandsArr = []
  const commandsCollection = new Collection()
  const commandsNamePath = {}

  const commandFolderPath = path.join(__dirname, "../../commands")
  const commandFiles = getFilePaths(commandFolderPath)

  for (const file of commandFiles) {
    const { default: command } = await import(file.path)

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
