import Redis from 'ioredis'
import { redisPort, redisStreamLimit } from '../config'

const redis = new Redis(redisPort)

const streamName = 'notifications'

export async function publishEvent(type: string, event: object) {
  const message = JSON.stringify({ type, event })

  await redis.xadd(streamName, '*', 'event', message)
  await redis.xtrim(streamName, 'MAXLEN', '~', redisStreamLimit)
}
