const Handler = require('../modules/commandhandler.js');
const manageQueue = require('../etc/manageQueue.js');

class Play extends Handler {
	constructor(Kongou) {
		super(Kongou, {
    		name: 'play',
    		usage: 'Plays Youtube Video(s) from Link, Playlist or a Search Term.',
    		category: 'Moosik',
    		level: 1
    	});
    	this.Kongou = Kongou;
	};

	async run(msg, args) {
		if (!this.Kongou.voiceConnections.has(msg.channel.guild.id)) {
			if (!msg.members.voiceState.channelID)
				return await msg.channel.createMessage('Admiral, You need to Join the Voice Channel first.');

			const voiceChannel = msg.channel.guild.channels.get(msg.members.voiceState.channelID);
			if (!voiceChannel.permissionOverwrites.has('voiceConnect') || !voiceChannel.permissionOverwrites.has('voiceSpeak'))
				return await msg.channel.createMessage('Admiral, You are so dumb. Please grant me Proper Permissions in this Channel.');

			await voiceChannel.join();
		};

		const parse = args.slice(1).join(' ').replace(/<(.+)>/g, '$1');
		if (parse.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await this.Kongou.youtube.getPlaylist(parse);
			const videos = await playlist.getVideos();
			for (const data of videos) {
				if (video.thumbnails !== undefined) {
				    manageQueue.bind(this.kongou, msg, data);
			    };
			};
			await msg.channel.createMessage(`Admiral, I added the Playlist ${playlist.title} on the Queue.`);
		} else {
			let data;
			try {
				data = await client.YouTube.getVideo(parse);
			} catch (error) {
				const searched = await client.YouTube.searchVideos(args.slice(1).join(' '), 1);
				if (!videos.length)
					return await msg.channel.createMessage('Admiral, You are so dumb. You cannot even search properly ?.');
				data = await client.YouTube.getVideoByID(searched[0].id);
			};
			if (video.thumbnails === undefined) 
		        return await msg.channel.send('Admiral, This is a Private Property. Have some respect to the Owner');
		    manageQueue.bind(this.kongou, msg, data);
		    await msg.channel.createMessage(`Admiral, I added ${data.title} on the Queue.`);
		};
	};
};

module.exports = Play;