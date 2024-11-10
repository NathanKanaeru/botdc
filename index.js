// index.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Membuat instance dari client Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, // Tambahkan intent untuk anggota guild
    ],
});

// Event ketika bot siap
client.once('ready', () => {
    console.log(`Bot telah online sebagai ${client.user.tag}`);
});

// Event ketika pesan diterima
client.on('messageCreate', (message) => {
    // Mengabaikan pesan dari bot itu sendiri
    if (message.author.bot) return;

    // Contoh respon sederhana
    if (message.content === '!ping') {
        message.channel.send('Pong!');
    }
});

// Event ketika anggota baru bergabung
client.on('guildMemberAdd', (member) => {
    // Ganti 'nama-channel-sambutan' dengan nama channel yang kamu inginkan
    const channel = member.guild.channels.cache.find(channel => channel.name === 'nama-channel-sambutan');
    
    if (channel) {
        channel.send(`Selamat datang ${member}, di server kami! 🎉`);
    }
});

// Login ke Discord dengan token dari .env
client.login(process.env.DISCORD_TOKEN);