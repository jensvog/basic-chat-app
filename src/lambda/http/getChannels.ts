import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getChannels } from '../../businessLogic/channels'
import { Channel } from '../../models/Channel'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const channels: Channel[] = await getChannels();

  return {
    statusCode: 201,
    body: JSON.stringify(channels)
  };
}
