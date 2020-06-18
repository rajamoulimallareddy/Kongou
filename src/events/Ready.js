const KongouEvent = require('../abstract/KongouEvent.js');


class Ready extends KongouEvent {
    get name() {
        return 'ready';
    }

    get once() {
        return true;
    }

    get currentCount() {
        if (!(this.count instanceof Number)) this.count = 0;
        if (this.count >= 2) this.count = 0;
        else this.count++;
        return this.count;
    }


    async run() {
        this.client.logger.debug(`${this.client.user.username}`, `Ready! Serving ${this.client.guilds.cache.size} guild(s) with ${this.client.users.cache.size} user(s)`);
        if (!this.interval) {
            await this.client.user.setActivity('Lexington-class aircraft carrier ー Saratoga, Hull Number CV-3!').catch(() => null)
            const statuses =  [
                'Commander, you dropped something~~ *kiss* ...Hehe, it was my heart♡. Here, you can keep it!',
                'Here, Commander, you get Sara\'s Pure Love chocolate ♪ Promise you\'ll love me forever and ever~',
                'Saratoga-chan loves you a lot~!'
            ];
            this.interval = setInterval(() => this.client.user.setActivity(statuses[this.currentCount]).catch(() => null), 300000)
        }
    }
}
module.exports = Ready;
