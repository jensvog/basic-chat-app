import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { EntryRequest } from '../../models/EntryRequest'
import { Entry } from '../../models/Entry'
import { createEntry } from '../../businessLogic/channels'
import { getUserName } from '../utils'
import { createLogger } from "../../utils/logger";

const logger = createLogger('createEntry');

export const handler = middy(async (event, _context) => {
    const newEntry: EntryRequest = JSON.parse(event.body);
    const userId: string = getUserName(event);

    logger.info('Create a new entry');

    const entry: Entry = await createEntry(newEntry, userId);

    return {
        statusCode: 201,
        body: JSON.stringify(entry)
    }
})

handler.use(
    cors({
      credentials: true
    })
  )