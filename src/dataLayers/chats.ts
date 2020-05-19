import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { Channel } from '../models/Channel'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { Entry } from '../models/Entry'
import { EntryUpdateRequest } from '../models/EntryUpdateRequest'

const XAWS = AWSXRay.captureAWS(AWS);

export class ChannelAccess {
    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly channelTable = process.env.CHANNEL_TABLE,
        private readonly entryTable = process.env.ENTRY_TABLE,
        private readonly entryIndex = process.env.ENTRY_INDEX
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

    async getEntries(channelId: string): Promise<Entry[]> {
        const result = await this.docClient.query({
            TableName: this.entryTable,
            IndexName: this.entryIndex,
            ScanIndexForward: false,
            KeyConditionExpression: 'channelId = :channelId',
            ExpressionAttributeValues: {
                ':channelId': channelId
            }
        })
        .promise();
        return result.Items as Entry[];
    }

    async updateEntry(updatedEntryRequest: EntryUpdateRequest, channelId: string, entryId: string, userId: string): Promise<boolean> {
        const result = await this.docClient.update({
            TableName: this.entryTable,
            Key: {
                channelId: channelId,
                entryId: entryId
              },
              UpdateExpression: "set message = :m",
              ExpressionAttributeValues: {
                  ":m": updatedEntryRequest.message,
                  ":u": userId
              },
              ConditionExpression: "userId = :u"
        })
        .promise();

        if (result.$response.error) {
            return false;
        } else {
            return true;
        }
    }

    async deleteEntry(channelId: string, entryId: string, userId: string): Promise<boolean> {
        const result = await this.docClient.delete({
            TableName: this.entryTable,
            Key: {
                channelId: channelId,
                entryId: entryId
              },
              ExpressionAttributeValues: {
                  ":u": userId
              },
              ConditionExpression: "userId = :u"
        })
        .promise();

        if (result.$response.error) {
            return false;
        } else {
            return true;
        }
    }
}

function createDynamoDBClient() {
    return new XAWS.DynamoDB.DocumentClient()
}