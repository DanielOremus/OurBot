const { getCommands, registerCommands } = require("./utils/commands/helpers.js")

const { commandsArr } = getCommands()
registerCommands(commandsArr)
