Array.prototype.max = function(){   //最大值
    return Math.max.apply({},this); 
};

var myChart;

function makeChart(data, title){
    // $('#result-chart').width('100%');

    var maxCFS = data.y.basin_cfs.max();
    var maxRunoff = data.y.runoff1.max();
    var maxYValue = maxCFS > maxRunoff ? maxCFS : maxRunoff;
    maxYValue = parseFloat((maxYValue * 1.5).toFixed(2));
    
    myChart = echarts.init(document.getElementById('result-chart'));

    option = {
    title : {
        text: '结果对比图',
        subtext: '',
        x: 'center',
        align: 'right'
    },
    grid: {
        bottom: 80
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            animation: false,
            label: {
                backgroundColor: '#000'
            }
        }
    },
    legend: {
        data:['降雨量', '计算流量', '观测流量'],
        x: 'left'
    },
    dataZoom: {
        show: true,
        realtime: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: false},
            data : data.datetime.map(function (str) {
                return str.replace(' ', '\n');
            })
        }
    ],
    yAxis: [
        {
            name: '流量(m^3/s)',
            type: 'value',
            max: maxYValue
        },
        {
            name: '降雨量(mm)',
            nameLocation: 'start',
            max: data.y.basin_ppt.max() * 5,
            type: 'value',
            inverse: true
        }
    ],
    series: [
            {
                name:'降雨量',
                type:'bar',
                yAxisIndex:1,
                data: data.y.basin_ppt
            },
            {
                name:'计算流量',
                type: 'line',
                symbolSize: 5,
                
                data: data.y.basin_cfs
            },
            // 自定义数据
            
            {
                name:'观测流量',
                type:'scatter',
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data:data.y.runoff1
            },

        ]
    };

    myChart.setOption(option);
}

// 上传文件：
function setFileChart(data, id) {
    id = id || 'file-chart';
    myChart = echarts.init(document.getElementById(id));
    myChart.setOption(option = {
        title: {
            text: '数据可视化结果'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: data.map(function (item) {
                return item[0];
            })
        },
        yAxis: {
            splitLine: {
                show: false
            }
        },
        toolbox: {
            left: 'center',
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        dataZoom: [{
            startValue: '2014-06-01'
        }, {
            type: 'inside'
        }],
        visualMap: {
            top: 10,
            right: 10,
            pieces: [{
                gt: 0,
                lte: 50,
                color: '#096'
            }, {
                gt: 50,
                lte: 100,
                color: '#ffde33'
            }, {
                gt: 100,
                lte: 150,
                color: '#ff9933'
            }, {
                gt: 150,
                lte: 200,
                color: '#cc0033'
            }, {
                gt: 200,
                lte: 300,
                color: '#660099'
            }, {
                gt: 300,
                color: '#7e0023'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: 'Henan AQI',
            type: 'line',
            data: data.map(function (item) {
                return item[1];
            }),
            markLine: {
                silent: true,
                data: [{
                    yAxis: 50
                }, {
                    yAxis: 100
                }, {
                    yAxis: 150
                }, {
                    yAxis: 200
                }, {
                    yAxis: 300
                }]
            }
        }
    });
}

