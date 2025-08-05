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
      const { type, name, description, required = false, choices = [] } = option

      switch (type) {
        case "string":
          data.addStringOption((o) => {
            o.setName(name).setDescription(description).setRequired(required)
            if (choices.length > 0) {
              o.addChoices(
                ...choices.map((c) => ({ name: c.name, value: c.value }))
              )
            }
            return o
          })
          break
        case "integer":
          data.addIntegerOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "boolean":
          data.addBooleanOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "user":
          data.addUserOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "channel":
          data.addChannelOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "role":
          data.addRoleOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "mentionable":
          data.addMentionableOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "number":
          data.addNumberOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        case "attachment":
          data.addAttachmentOption((o) =>
            o.setName(name).setDescription(description).setRequired(required)
          )
          break
        default:
          console.warn(`Unknown option type: ${type}`)
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
