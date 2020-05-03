import { APIGatewayProxyHandler } from "aws-lambda";
import { EntryRequest } from '../../models/EntryRequest'
import { Entry } from '../../models/Entry'
import { createEntry } from '../../businessLogic/channels'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger";

const logger = createLogger('createEntry');

export const handler: APIGatewayProxyHandler = async (event, _context) => {
    const newEntry: EntryRequest = JSON.parse(event.body);
    const userId: string = getUserId(event);

    logger.info('Create a new entry');

    const entry: Entry = await createEntry(newEntry, userId);

    return {
        statusCode: 201,
        body: JSON.stringify(entry)
    }
}