
const Discord = require('discord.js')
const client = new Discord.Client()
const yts = require('yt-search')
const ytdl = require('ytdl-core')

client.on("ready", () => {
    console.log(`Logged as ${client.user.tag}!`)
});

client.on("message", async(msg) => {
    if(msg.content.startsWith("!p"||"!play")){
        const args = msg.content.split(" ").slice(1)
        if(!args[0]){
            const embed2 = new Discord.MessageEmbed()
            .setTitle('**사용법 `!p 노래이름`**')
            .setColor('RED')
            msg.reply(embed2)
        }else if (msg.member.voice.channel) {
            const connection = await msg.member.voice.channel.join();
            const search = await yts(args.join(" "))
            const videos = search.videos.slice( 0, 1 )
            videos.forEach(async function(v){
                const views = String(v.views).padStart(10, '')
                const playing = new Discord.MessageEmbed()
                .setTitle("**"+v.title+"**")
                .setColor(0x4169e1)
                .setImage(v.thumbnail)
                .addFields(
                    {name:'**업로더**',value:`[${v.author.name}](${v.author.url})`,inline:true},
                    {name:'**길이**',value:v.timestamp, inline:true},
                    {name:'**조횟수**',value:views, inline:true}
                )
                .setDescription('유튜브에서 노래를 재생합니다.')
                dddd = await msg.reply(playing)
                connection.play(ytdl(v.url,{filter:'audioonly'})).on('finish',()=>{
                    const end = new Discord.MessageEmbed()
                    .setTitle('**노래를 종료합니다.**')
                    .setColor(0x4169e1)
                    msg.reply(end)
                    connection.disconnect()
                    dddd.delete()
                })
            })
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle('**음성 채널에 먼저 접속해주세요!**')
            .setColor('RED')
            msg.reply(embed)
        }
    }
})

client.login(process.env.TOKEN)