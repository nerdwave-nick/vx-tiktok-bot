import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits as GatewayIntents } from "discord.js";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

// create a new instance of the client
const client = new SapphireClient({
    intents: [GatewayIntents.Guilds, GatewayIntents.GuildMessages, GatewayIntents.MessageContent],
    loadMessageCommandListeners: true,
});

// login to the discord gateway
client.login(process.env.DISCORD_TOKEN);
