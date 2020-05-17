import { ChannelRequest } from '../models/ChannelRequest'
import { v4 as uuidv4 } from 'uuid'
import { ChannelAccess } from '../dataLayers/chats'
import { Channel } from '../models/Channel'
import { EntryRequest } from '../models/EntryRequest'
import { Entry } from '../models/Entry'
import { EntryUpdateRequest } from '../models/EntryUpdateRequest'

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

export async function createEntry(newEntry: EntryRequest, userId: string, userName: string): Promise<Entry> {
    const entry: Entry = {
        channelId: newEntry.channelId,
        entryId: uuidv4(),
        userId,
        userName,
        message: newEntry.message,
        createdAt: new Date().toISOString()
    };

    await channelAccess.createEntry(entry);

    return entry;
}

export async function getEntries(channelId: string): Promise<Entry[]> {
    return await channelAccess.getEntries(channelId);
}

export async function updateEntry(updatedEntryRequest: EntryUpdateRequest, channelId: string, entryId: string, userId: string): Promise<boolean> {
    return await channelAccess.updateEntry(updatedEntryRequest, channelId, entryId, userId);
}

export async function deleteEntry(channelId: string, entryId: string, userId: string): Promise<boolean> {
    return await channelAccess.deleteEntry(channelId, entryId, userId);
}