import { ChannelRequest } from '../models/ChannelRequest'
import { v4 as uuidv4 } from 'uuid'
import { ChannelAccess } from '../dataLayers/chats'
import { Channel } from '../models/Channel'
import { EntryRequest } from '../models/EntryRequest'
import { Entry } from '../models/Entry'

const channelAccess = new ChannelAccess();

export async function createChannel(newChannel: ChannelRequest): Promise<Channel> {
    const channel: Channel = {
        channelId: uuidv4(),
        name: newChannel.name
    }

    await channelAccess.createChannel(channel);

    return channel;
}

export async function getChannels(): Promise<Channel[]> {
    return await channelAccess.getChannels();
}

export async function createEntry(newEntry: EntryRequest, userId: string): Promise<Entry> {
    const entry: Entry = {
        channelId: newEntry.channelId,
        entryId: uuidv4(),
        userId: userId,
        message: newEntry.message,
        createdAt: new Date().toISOString()
    };

    await channelAccess.createEntry(entry);

    return entry;
}