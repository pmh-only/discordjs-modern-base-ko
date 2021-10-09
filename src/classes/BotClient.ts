import { Client, ClientEvents } from 'discord.js'
import { config } from 'dotenv'
import _ from '../consts'

config() // `.env` 파일을 불러옵니다.

/**
 * 봇 클라이언트
 *
 * 토큰, 세션 관리 및 이벤트 레지스트리를 담당합니다.
 * * Discord.js Client의 확장입니다.
 * * 샤딩을 지원합니다.
 */
export default class BotClient extends Client {
  /**
   * 클라이언트 생성
   *
   * 환경변수를 읽고 해당 토큰을 사용하여 클라이언트를 생성합니다.
   */
  public constructor () {
    super({ intents: _.CLIENT_INTENTS })

    if (!process.env.DISCORD_TOKEN) {
      throw new Error('환경변수 `DISCORD_TOKEN`이 없습니다. `.env` 파일을 확인해보세요.')
    }

    this.token = process.env.DISCORD_TOKEN!
    this.login()
  }

  /**
   * 이벤트 핸들러 등록
   *
   * 지정한 이벤트가 발생 하였을 때 해당 핸들러를 호출합니다.
   *
   * * `func`의 내용은 기본적으로 `client.on`을 따릅니다.
   * * `extra`를 입력할 경우 추가되어 같이 전달해 줍니다.
   *
   * @example
   *    client.onEvent('ready', (client, info) => {
   *      console.log(client?.user.username, '봇이 준비되었습니다.', info) // 출력: OOO 봇이 준비되었습니다. 추가 정보
   *    }, ['추가 정보'])
   *
   * @param event 이벤트명
   * @param func 이벤트 핸들러 함수
   * @param extra 추가로 전달할 목록
   */
  public onEvent = (event: keyof ClientEvents, func: Function, ...extra: any[]) =>
    this.on(event, (...args) => func(...args, ...extra))

  /** 총 유저 수 (Promise) */
  public readonly totalUserCount =
    () => this.totalCounter('users')

  /** 총 길드 수 (Promise) */
  public readonly totalGuildCount =
    () => this.totalCounter('guilds')

  /** 총 채널 수 (Promise) */
  public readonly totalChannelCount =
    () => this.totalCounter('channels')

  private async totalCounter (key: 'guilds' | 'users' | 'channels') {
    if (!this.shard) return this[key].cache.size

    const shardData = await this.shard
      .fetchClientValues(`${key}.cache.size`) as number[]

    return shardData.reduce((prev, curr) => prev + curr, 0)
  }
}
