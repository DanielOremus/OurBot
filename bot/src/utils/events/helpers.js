import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import { pathToFileURL } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function getFiles() {
  //TODO: refactor for recursion
  const eventsPath = path.join(__dirname, "../../events")
  let files = fs.readdirSync(eventsPath)
  const promises = []

  for (const file of files) {
    if (!file.endsWith(".js")) continue
    const filePath = pathToFileURL(path.join(eventsPath, file))
    promises.push(import(filePath))
  }

  return await Promise.all(promises)
}

export const registerEvents = async (client) => {
  try {
    const events = await getFiles()

    for (const { default: event } of events) {
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
      } else {
        client.on(event.name, (...args) => event.execute(...args))
      }
    }
    console.log("Successfully registered events")
  } catch (error) {
    console.error(error)
  }
}
