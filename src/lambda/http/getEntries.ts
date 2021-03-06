import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import 'source-map-support/register';
import { getEntries } from '../../businessLogic/channels'
import { Entry } from '../../models/Entry'
import { createLogger } from '../../utils/logger';

const logger = createLogger('getEntries');

export const handler = middy(async (event, _context) => {
  const channelId = event.pathParameters.channelId
  const entries: Entry[] = await getEntries(channelId);

  logger.info('Get all entries for the channel');

  return {
    statusCode: 201,
    body: JSON.stringify(entries)
  };
})

handler.use(
  cors({
    credentials: true
  })
)