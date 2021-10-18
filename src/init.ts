import { client, slash } from '.'

client.onEvent('ready', async () => {
  console.log('start registering')

  if (!process.env.ENVIROMENT_DEV_GUILD) {
    await slash.registCachedCommands(client)
  }

  console.log('done registering')
  process.exit()
})
