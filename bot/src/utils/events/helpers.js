const path = require("path")
const fs = require("fs")

function getFiles() {
  //TODO: refactor for recursion
  //TODO: add multi lang support (en, ua) via i18next
  const eventsPath = path.join(__dirname, "../../events")
  let files = fs.readdirSync(eventsPath)
  const modules = []

  for (const file of files) {
    if (!file.endsWith(".js")) continue
    const filePath = path.join(eventsPath, file)
    modules.push(require(filePath))
  }

  return modules
}

module.exports.registerEvents = async (client) => {
  try {
    const events = getFiles()

    for (const event of events) {
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
