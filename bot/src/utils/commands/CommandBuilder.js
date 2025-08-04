import { SlashCommandBuilder } from "discord.js"

class CommandBuilder {
  constructor({ name, description, executeFunc, options = [] }) {
    this.name = name
    this.description = description
    this.options = options
    this.executeFunc = executeFunc
    this.commandObj = {}
  }
  buildDataPipeline() {
    const data = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)

    for (const option of this.options) {
      switch (option.type) {
        case "string":
          data.addStringOption((o) => o.setName())
      }
    }

    return data
  }
  build() {
    const commandData = this.buildDataPipeline()

    this.commandObj = {
      data: commandData,
      execute: async (interaction) => await this.executeFunc(interaction),
    }
    return this.commandObj
  }
}

export default CommandBuilder
