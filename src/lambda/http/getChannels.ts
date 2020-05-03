import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import 'source-map-support/register';
import { getChannels } from '../../businessLogic/channels'
import { Channel } from '../../models/Channel'
import { createLogger } from '../../utils/logger';

const logger = createLogger('getChannels');

export const handler = middy(async (event, _context) => {
  const channels: Channel[] = await getChannels();

  logger.info('Get all channels');

  return {
    statusCode: 201,
    body: JSON.stringify(channels)
  };
})

handler.use(
  cors({
    credentials: true
  })
)