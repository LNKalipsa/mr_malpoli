const botConfig = require('./data.json')

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
const roleToAddId = botConfig.configPortland.roleToAddId;
const requiredRoleId = botConfig.configPortland.requiredRoleId;
const channelId = botConfig.configPortland.channelId;
const serveurId = botConfig.configPortland.serveurId;
const token = botConfig.token;
let pingers = [];
helloWords = botConfig.helloWords;

client.on("ready", () => {
    console.log('bot opérationnel');
});

client.login(process.env.TOKEN);

client.on("messageCreate", message => {
    if(message.author.bot) return;

/**
 * TEST DE POLITESSE :
 */ 
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


/**
 * RESET DU RÔLE TOUS LES JOURS A 3H :
 */ 
const interval = 3600000; //1h = 3 600 000
setInterval(() => {

    removeRole();
}, interval);

function removeRole() {
    var now = new Date();
    let hours = now.getHours();
    
    if(hours === 3){
        const guild = client.guilds.cache.get(serveurId);
        guild.members.fetch().then((members) => {
            members.forEach(member => {
                member.roles.remove(roleToAddId);
                console.log('rôles retirés');
            })
        });
    }
}

/**
 * TEST DES MOTS AUTORISES :
 */ 
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