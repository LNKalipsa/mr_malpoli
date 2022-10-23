
//token : MTAzMjIxMjQwNzU5MTkwMzI3Mg.GTM3Iq.9y5nK-nOmlahIBz9ctX_4qgM-c-Ptsr0I2bKvo

const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers
    ]
});
const roleToAddId = '';
const requiredRoleId = '';
const channelId = '';
const serveurId = '';
const token = '';

client.on("ready", () => {
    console.log('bot opérationnel');
});

client.login(token);


//événement déclenché à chaque fois que le bot détecte un message envoyé dans le salon
client.on("messageCreate", message => {
    if(message.author.bot) return;

    if(message.content === "ping"){
        message.reply("pong");
    }

    if(message.content === "mention") {
        message.reply("Mention d'un utilisateur : <@" + message.author.id + ">\nMention d'un salon : <#" + message.channel.id + ">");
    }

    let userId = message.author.id;
    const guild = client.guilds.cache.get(serveurId);

    guild.members.fetch(userId).then(member => {

        if(message.channelId !== channelId){
            return;
        }

        if (!member.roles.cache.has(roleToAddId) && member.roles.cache.has(requiredRoleId))
        helloWords.forEach(word => {
            if (isWordInString(word, message.content.toLowerCase())) {
                member.roles.add(roleToAddId);
                message.react('👋');

                return;
            }
        });

    }).catch(console.error);

});

const interval = 5000; //1h = 3 600 000


setInterval(() => {

    removeRole();
}, interval);

function removeRole() {
    var now = new Date();
    let hours = now.getHours();
    
    if(hours === 16){
        const guild = client.guilds.cache.get(serveurId);
        guild.members.fetch().then((members) => {
            members.forEach(member => {
                member.roles.remove(roleToAddId);
            })
        });
    }
}

function isWordInString(word, message) {
    const regStart = new RegExp('^[\.,?!:;"\' -]*' + word + '[\.,?!:;"\' -]+');
    const regContent = new RegExp('[\.,?!:;"\' -]+' + word + '[\.,?!:;"\' -]+');
    const regEnd = new RegExp('[\.,?!:;"\' -]+' + word + '$');
    const regOnly = new RegExp('^' + word + '$');

    if (regStart.test(message)) {
        return true;
    }
    if (regContent.test(message)) {
        return true;
    }
    if (regEnd.test(message)) {
        return true;
    }
    if (regOnly.test(message)) {
        return true;
    }

    return false;
}