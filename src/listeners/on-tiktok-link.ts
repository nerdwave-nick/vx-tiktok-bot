
import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class IiktokListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: Events.MessageCreate
        });
    }
    public async run(message: Message) {
        if (message.guild === null) return;
        const text = message.content;
        if (text.includes("vm.tiktok.com")) {
            try {
                message.suppressEmbeds(true);
            } catch (e) {
                this.container.logger.error(e);
            }
            const newtext = text.replace(/https:\/\/vm.tiktok.com\/(.*)\//g, `https://vm.vxtiktok.com/$1`);
            await message.reply({ allowedMentions: { repliedUser: false }, content: newtext })
        }
    }
}

