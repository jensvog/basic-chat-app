import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getChannels } from '../../businessLogic/channels'
import { Channel } from '../../models/Channel'
import { createLogger } from '../../utils/logger';

const logger = createLogger('getChannels');

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const channels: Channel[] = await getChannels();

  logger.info('Get all channels');

  return {
    statusCode: 201,
    body: JSON.stringify(channels)
  };
}
