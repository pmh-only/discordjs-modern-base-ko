import { ApplicationCommandData, CommandInteraction } from 'discord.js'

export default interface Command {
  run: (args: CommandInteraction) => any
  metadata: ApplicationCommandData
}
