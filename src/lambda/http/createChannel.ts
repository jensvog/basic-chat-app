import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { createChannel } from '../../businessLogic/channels'
import { ChannelRequest } from '../../models/ChannelRequest'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  const newChannel: ChannelRequest = JSON.parse(event.body)

  createChannel(newChannel);

  return {
    statusCode: 201,
    body: ''
  };
}
