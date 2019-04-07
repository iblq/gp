const config = {
    appName : 'henan-web',
    siteTitle: '河南小流域洪水stvsrm模型预测分析系统',
    chartScript: '/Users/jack/work/henan/henanWeb/model/chart.py',
    workBase: '/Users/jack/work/henan/',
    env: {
        python: {
            "PATH": "/Users/jack/anaconda/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
        },
        java: {
            "JAVA_HOME": "/Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home",
            "PATH": "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/apache-maven-3.5.2/bin"
        }
    }
};

module.exports = config;