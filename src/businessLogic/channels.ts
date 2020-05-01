import { ChannelRequest } from '../models/ChannelRequest'
import { v4 as uuidv4 } from 'uuid'
import { ChannelAccess } from '../dataLayers/chats'
import { Channel } from '../models/Channel'

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