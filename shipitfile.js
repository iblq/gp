module.exports = function (shipit) {
    // require('shipit-deploy')(shipit);
    // require('shipit-npm')(shipit);

    shipit.initConfig({
        main: {
            servers: 'mapljx@z'
        }
    });

    shipit.task('deploy', async function () {
        try{
            await shipit.remote('/usr/bin/git pull', {'cwd': '/home/mapljx/henan/henanWeb'});
            await shipit.remote('/usr/local/bin/pm2 restart henan', {'cwd': '/home/mapljx/henan/henanWeb'});
        }catch (e){
            console.log(e.message);
        }
    });

};