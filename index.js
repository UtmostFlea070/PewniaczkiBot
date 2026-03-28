const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ======= USTAWIENIA =======
const TOKEN = 'MTQ4NzQ0NTY1NjU4MTk2NzkwMg.Gun0-Q.XfDe_94hFN6a74TWDxs9wATEXb5c75GMSWffCw';
const GENERAL_CHANNEL_ID = '795381148209381407';

// kanały, które mają wywoływać alert
const sportChannels = {
  'dada': true,
  'ac': true
};

// prefix, który ma wywoływać alert
const TRIGGER = '[TYP]';
// ==========================

client.once('ready', () => {
  console.log(`Zalogowano jako ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const channelName = message.channel.name;

  if (!sportChannels[channelName]) return;
  if (!message.content.toUpperCase().includes(TRIGGER)) return;

  try {
    const generalChannel = await client.channels.fetch(GENERAL_CHANNEL_ID);
    const emoji = sportChannels[channelName];
    const link = `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`;

    await generalChannel.send(
      `🔥 **Nowy TYP na #${channelName}**\n` +
      `👤 Autor: ${message.author.nickname}\n` +
      `🔗 Sprawdź: ${link}`
    );
  } catch (error) {
    console.error('Błąd przy wysyłaniu alertu:', error);
  }
});

client.login(TOKEN);