const Discord = require('discord.js')
const canvas = require('discord-canvas'),
    welcomeCanvas = new canvas.Welcome(),
    leaveCanvas = new canvas.Goodbye()

const {
    token,
    PREFIX,
    unicolor,
    imageLink,
    channel
} = require('./config.json')
let universalColor = unicolor.toUpperCase()

const client = new Discord.Client()

client.on('ready', () => {
    console.log(`${client.user.username} is online!`)
})

client.on('guildMemberAdd', async member => {
    let image = await welcomeCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({
            format: 'png'
        }))
        .setColor("border", universalColor)
        .setColor("username-box", universalColor)
        .setColor("discriminator-box", universalColor)
        .setColor("message-box", universalColor)
        .setColor("title", universalColor)
        .setColor("avatar", universalColor)
        .setBackground(imageLink)
        .toAttachment()


    let attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");

    member.guild.channels.cache.find(c => c.id === channel).send(attachment)
    .catch(err => console.log(err))
    .then(m => m.delete({ timeout : 20000 }))
})

client.on('guildMemberRemove', async member => {
    let image = await leaveCanvas
        .setUsername(member.user.username)
        .setDiscriminator(member.user.discriminator)
        .setMemberCount(member.guild.memberCount)
        .setGuildName(member.guild.name)
        .setAvatar(member.user.displayAvatarURL({
            format: 'png'
        }))
        .setColor("border", universalColor)
        .setColor("username-box", universalColor)
        .setColor("discriminator-box", universalColor)
        .setColor("message-box", universalColor)
        .setColor("title", universalColor)
        .setColor("avatar", universalColor)
        .setBackground(imageLink)
        .toAttachment()


    let attachment = new Discord.MessageAttachment(image.toBuffer(), "leave-image.png");

    member.guild.channels.cache.find(c => c.id === "826009028030890004").send(attachment)
})

client.on('message', async message => {
    if (message.content === `${PREFIX}add`) {
        client.emit('guildMemberAdd', message.member)
    }

    if (message.content === "leave"){
        client.emit('guildMemberRemove', message.member)
    }
})


client.on('message', async message => {
	// Voice only works in guilds, if the message does not come from a guild,
	// we ignore it
	if (!message.guild) return;
  
	if (message.content === `${PREFIX}join`) {
	  // Only try to join the sender's voice channel if they are in one themselves
	  if (message.member.voice.channel) {
    const connection = await message.member.voice.channel.join();
    message.reply('Joined voice channel!');
	  } else {
		message.reply('You need to join a voice channel first!');
	  }
	}
})



client.login(token)