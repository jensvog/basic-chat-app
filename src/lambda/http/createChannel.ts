import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import 'source-map-support/register';
import { createChannel } from '../../businessLogic/channels'
import { ChannelRequest } from '../../models/ChannelRequest'
import { Channel } from '../../models/Channel'
import { createLogger } from '../../utils/logger';

const logger = createLogger('createChannel')

export const handler = middy(async (event, _context) => {
  const newChannel: ChannelRequest = JSON.parse(event.body)

  logger.info('Creating new channel');

  const channel: Channel = await createChannel(newChannel);

  return {
    statusCode: 201,
    body: JSON.stringify(channel)
  };
})

handler.use(
  cors({
    credentials: true
  })
)