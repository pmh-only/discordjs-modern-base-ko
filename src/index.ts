import BotClient from './classes/BotClient'
import SlashHandler from './classes/SlashHandler'

import onReady from './events/onReady'
import onInteractionCreate from './events/onInteractionCreate'

// 봇 클라이언트를 생성합니다.
export const client = new BotClient()
export const slash = new SlashHandler()

client.onEvent('ready', onReady)
client.onEvent('interactionCreate', onInteractionCreate)
