import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { Channel } from '../models/Channel'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

const XAWS = AWSXRay.captureAWS(AWS);

export class ChannelAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly channelTable = process.env.CHANNEL_TABLE
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
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}