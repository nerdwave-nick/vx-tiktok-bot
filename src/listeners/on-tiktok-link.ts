
import { Events, Listener } from '@sapphire/framework';
import type { Message } from 'discord.js';

const mobileregex = /https:\/\/vm\.tiktok\.com\/(.*)\//g
const desktopregex = /https:\/\/(?:www\.)?tiktok\.com\/(@[a-z]+)\/video\/([0-9]*)/g

export class IiktokListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: false,
            event: Events.MessageCreate
        });
    }

    async mobile(message: Message) {
        const text = message.content;
        const match = mobileregex.exec(text);
        if (!match || match.length < 2) {
            this.container.logger.warn("No match")
            return;
        }
        try {
            message.suppressEmbeds(true);
        } catch (e) {
            this.container.logger.error(e);
        }
        const newtext = text.replace(mobileregex, `https://vm.vxtiktok.com/$1`);
        await message.reply({ allowedMentions: { repliedUser: false }, content: newtext })
    }

    async desktop(message: Message) {
        const text = message.content;
        const match = desktopregex.exec(text);
        if (!match || match.length < 3) {
            this.container.logger.warn("No match")
            return;
        }
        try {
            message.suppressEmbeds(true);
        } catch (e) {
            this.container.logger.error(e);
        }
        const newtext = text.replace(desktopregex, `https://www.vxtiktok.com/$1/video/$2`);
        await message.reply({ allowedMentions: { repliedUser: false }, content: newtext })
    }

    public async run(message: Message) {
        if (message.author.bot) return;
        if (message.guild === null) return;
        const text = message.content;
        if (text.includes("https://vm.tiktok.com/")) {
            await this.mobile(message);
        } else if (text.includes("https://www.tiktok.com/") || text.includes("https://tiktok.com/")) {
            await this.desktop(message);
        }
    }
}

