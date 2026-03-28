const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// ======= USTAWIENIA =======
const TOKEN = process.env.TOKEN;
const GENERAL_CHANNEL_ID = '1487519239073042472';

// kanały, które mają wywoływać alert
const sportChannels = {
  'tenis': true,
  'kosz': true,
  'dart': true,
  'handball': true,
  'hokej': true,
  'siata': true,
  'cs': true,
  'pilkarzyki': true
};

// prefix, który ma wywoływać alert
const TRIGGER = 'PEWNIACZEK';
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
      `👤 Pan Typer: ${message.member ? message.member.displayName : message.author.username}\n` +
      `🎯 Kanał: ${link}`
    );
  } catch (error) {
    console.error('Błąd przy wysyłaniu alertu:', error);
  }
});

client.login(TOKEN);
