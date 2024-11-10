// index.js
require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

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

    // Perintah untuk menguji sambutan
    if (message.content === '!testwelcome') {
        const channel = message.channel; // Mengambil channel tempat perintah dipanggil
        const member = message.member; // Mengambil member yang mengirim perintah

        // Membuat embed untuk sambutan
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Selamat datang!')
            .setDescription(`Selamat datang ${member}, di server kami! 🎉`)
            .setThumbnail(member.user.displayAvatarURL()) // Menampilkan avatar user
            .addFields(
                { name: 'Nama Pengguna', value: member.user.tag, inline: true },
                { name: 'ID Pengguna', value: member.id, inline: true }
            )
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] }); // Mengirim embed ke channel
    }
});

// Event ketika anggota baru bergabung
client.on('guildMemberAdd', (member) => {
    // Ganti 'nama-channel-sambutan' dengan nama channel yang kamu inginkan
    const channel = member.guild.channels.cache.find(channel => channel.name === 'nama-channel-sambutan');
    
    if (channel) {
        // Membuat embed untuk sambutan
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Selamat datang!')
            .setDescription(`Selamat datang ${member}, di server kami! 🎉`)
            .setThumbnail(member.user.displayAvatarURL()) // Menampilkan avatar user
            .addFields(
                { name: 'Nama Pengguna', value: member.user.tag, inline: true },
                { name: 'ID Pengguna', value: member.id, inline: true }
            )
            .setTimestamp();

        channel.send({ embeds: [welcomeEmbed] }); // Mengirim embed ke channel
    }
});

// Login ke Discord dengan token dari .env
client.login(process.env.DISCORD_TOKEN);