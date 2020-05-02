import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getEntries } from '../../businessLogic/channels'
import { Entry } from '../../models/Entry'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const channelId = event.pathParameters.channelId
  const entries: Entry[] = await getEntries(channelId);

  return {
    statusCode: 201,
    body: JSON.stringify(entries)
  };
}
