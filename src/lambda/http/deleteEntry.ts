import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteEntry } from '../../businessLogic/channels'
import { getUserId } from '../utils'

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    const entryId = event.pathParameters.entryId
    const channelId = event.pathParameters.channelId
    const userId: string = getUserId(event);

    const result = await deleteEntry(channelId, entryId, userId);

    if (result) {
        return {
            statusCode: 200,
            body: ''
        }
    } else {
        return {
            statusCode: 400,
            body: ''
        }
    }

}