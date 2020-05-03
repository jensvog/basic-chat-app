import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { EntryRequest } from '../../models/EntryRequest'
import { updateEntry } from '../../businessLogic/channels'
import { getUserId } from '../utils'
import { createLogger } from "../../utils/logger";

const logger = createLogger('updateEntry');

export const handler = middy(async (event, _context) => {
    const entryId = event.pathParameters.entryId
    const channelId = event.pathParameters.channelId
    const updatedEntry: EntryRequest = JSON.parse(event.body);
    const userId: string = getUserId(event);

    logger.info('Update an entry');

    const result = await updateEntry(updatedEntry, channelId, entryId, userId);

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
})

handler.use(
    cors({
      credentials: true
    })
  )
  