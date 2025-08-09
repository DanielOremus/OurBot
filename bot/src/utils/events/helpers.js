const { getFiles } = require("../functions/filesHelper.js")
const path = require("path")
//TODO: refactor for recursion
//TODO: add multi lang support (en, ua) via i18next

exports.registerEvents = async (client) => {
  try {
    const eventsFolderPath = path.join(__dirname, "../../events")
    const eventsFiles = getFiles(eventsFolderPath)

    for (const file of eventsFiles) {
      const event = require(file.path)
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
