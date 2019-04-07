const config = {
    appName : 'henan-web',
    siteTitle: '河南小流域洪水stvsrm模型预测分析系统',
    chartScript: '/home/mapljx/henan/henanWeb/model/chart.py',
    workBase: '/home/mapljx/henan/',
    env: {
        python: {
            "PATH": "/home/mapljx/anaconda3/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        },
        java: {
            "JAVA_HOME": "/usr/lib/jvm/java-8-oracle",
            "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/lib/jvm/java-8-oracle/bin:/usr/lib/jvm/java-8-oracle/db/bin:/usr/lib/jvm/java-8-oracle/jre/bin"
        }
    }
};

module.exports = config;