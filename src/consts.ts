import { IntentsString } from 'discord.js'
import { config } from 'dotenv'
import { join } from 'path'

config()

/** 상수 목록 */
export default class Consts {
  /**
   * 클라이언트 인텐츠 설정
   *
   * 클라이언트에서 사용할 권한을 다음과 같이 제한합니다.
   * * 예시로 `GUILD_MESSAGES`를 추가할 경우 길드에서 생성된 메시지를 받을 수 있습니다.
   * * 자세한 내용은 [Discord.js 인텐츠 설정](https://discordjs.guide/popular-topics/intents.html#privileged-intents)을 참고하세요.
   *
   * 만약 `[DISALLOWED_INTENTS]`로 시작하는 에러가 발생할 경우 [이곳](https://stackoverflow.com/a/64007362)을 참고하세요.
   */
  public static readonly CLIENT_INTENTS: IntentsString[] =
    ['GUILDS'/* 권한을 이곳에 추가하세요 */]

  /** 명령어 폴더 경로 */
  public static readonly COMMANDS_PATH =
    join(__dirname, 'commands')

  /** 명령어 파일 경로 계산 */
  public static readonly COMMAND_PATH =
    (commandFile: string) =>
      join(this.COMMANDS_PATH, commandFile)
}

//! 토큰 설정을 찾으시나요? `.env`혹은 `.env.example` 파일을 참고하세요
