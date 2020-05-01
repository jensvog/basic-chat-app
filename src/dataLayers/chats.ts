import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { Channel } from '../models/Channel'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Entry } from '../models/Entry'

const XAWS = AWSXRay.captureAWS(AWS);

export class ChannelAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly channelTable = process.env.CHANNEL_TABLE,
        private readonly entryTable = process.env.ENTRY_TABLE
    ) {}

    async createChannel(newChannel: Channel) {
        await this.docClient.put({
                TableName: this.channelTable,
                Item: newChannel
            }
        )
        .promise();
    }

    async getChannels(): Promise<Channel[]> {
        const result = await this.docClient.scan({
            TableName: this.channelTable
        })
        .promise();

        return result.Items as Channel[];
    }

    async createEntry(entry: Entry) {
        await this.docClient.put({
            TableName: this.entryTable,
            Item: entry
        }
    )
    .promise();
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}