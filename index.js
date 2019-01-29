const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', function() {
  bot.user.setActivity("ton role", {type: "WATCHING"});
  bot.user.setStatus("online");
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
});

var token = 'NTM5ODczMjMxNDExMzQ3NDc2.DzJbrw.0_USXt39agGUZzbFJzsrIkhUI9U';

bot.login(token)

let a = 0;

bot.on('message', async message =>{
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let errorEmbed = new Discord.RichEmbed()
  .setDescription("Error")
  .setColor("#ff0000")
  .setThumbnail(message.guild.avatarURL)
  .addField("Error Undefined", `Couldn't execute`);

  if(cmd == `Rainbow` && args == "help"){
    let helpEmbed = new Discord.RichEmbed()
    .setColor("#ff00ff")
    .setThumbnail(bot.user.displayAvatarURL)
    .setTitle("Commandes d'aide")
    .addField("Rainbow help", "Pour afficher la liste des commandes")
    .addField("Rainbow create", "Pour créer le Rôle")
    .addField("Rainbow on", "Pour allumer le mode Rainbow")
    .addField("Purge {nombre}", "Nettoyez votre salon");
    return message.channel.send(helpEmbed);
  }
  if(cmd == `Rainbow` && args == "create"){
    if(a==1){
      if(message.member.hasPermission("MANAGE_MESSAGES")){
        var RainRol1 = message.guild.roles.find(role => role.name == "Rainbow");
        if(RainRol1 == null){
          bot.guilds.get(message.guild.id).createRole({
            name: "Rainbow",
            color: "#ff00ff",
            permissions: []
          });
          return message.channel.send("Créer!")
        }else return message.channel.send("Juste un role suffira!");
      }else return message.channel.send(errorEmbed);
    }
    if(a==0){
      message.channel.send("Mettez le rôle **RainBowBot** tout en haut de la liste!");
      a++
    }
  }
  if(cmd == `Purge` && args){
    if(message.member.hasPermission("MANAGE_MESSAGES")){
      let delNum = args[0];
      if(delNum){
        message.channel.bulkDelete(delNum+1)
      }else message.channel.send(errorEmbed)
    }else message.channel.send(errorEmbed)
  }
   if(cmd == `Rainbow` && args == "on".toLocaleLowerCase()){
    let RainRol = message.guild.roles.find(role => role.name == "Rainbow");
    if(RainRol){
      const size = 48;const rainbow = new Array(size);let place = 0;
      for (var i=0; i<size; i++) {
          var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
          var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
          var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg
          rainbow[i] = '#'+ red + green + blue;
      }
      function sin_to_hex(i, phase) {
          var sin = Math.sin(Math.PI / size * 2 * i + phase);
          var int = Math.floor(sin * 127) + 128;
          var hex = int.toString(16);
          return hex.length === 1 ? '0'+hex : hex;
      }
      function changeColor() {
        RainRol.edit({color: rainbow[place]})
        .catch(console.error);
        if(place == (size - 1)){
          place = 0;
        }else{
          place++;
        }
      }
      var interval = setInterval(changeColor, 1000);
      if(interval == 200) clearInterval(interval)
    }else return message.channel.send("Il faut d'abord faire `Rainbow create` pour créer le rôle!")
  }
});