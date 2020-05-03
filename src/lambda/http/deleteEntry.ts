import { APIGatewayProxyHandler } from "aws-lambda";
import { deleteEntry } from '../../businessLogic/channels'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger";

const logger = createLogger('deleteEntry')

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    const entryId = event.pathParameters.entryId
    const channelId = event.pathParameters.channelId
    const userId: string = getUserId(event);

    logger.info('Deleting entry');

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