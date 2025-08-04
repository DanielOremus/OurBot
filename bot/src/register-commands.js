import { getCommands, registerCommands } from "./utils/commands/helpers.js"

const { commandsArr } = await getCommands()
await registerCommands(commandsArr)
