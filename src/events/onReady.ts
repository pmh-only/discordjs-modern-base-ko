import { client, slash } from '..'

/** onReady 핸들러 */
export default function onReady () {
  if (!client.user) return

  console.log('Ready!', client.user.username)
  client.user.setActivity('with your heart')

  if (process.env.REFRESH_SLASH_COMMAND_ON_READY === 'true') {
    slash.registCachedCommands(client)
  }
}
