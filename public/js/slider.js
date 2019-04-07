function genSlider() {

    var slideConfig = {
        layer_depth: [0.1, 0.5, 0.01],
        hamon_coef: [0.004, 0.02, 0.001],
        ssr2gw_rate: [0.05, 0.1, 0.001],
        gwflow_coef: [0.001, 0.5, 0.001],
        gwsink_coef: [0.001, 0.5, 0.001],
        ofp_alpha: [0.01, 3, 0.01],
        ofp_cmp: [0.01, 4, 0.01],
        chan_alpha: [0.01, 3, 0.01],
        chan_cmp: [0.01, 4, 0.01],
        slowcoef_lin: [0.0005, 0.5, 0.0005],
        pref_flow_den: [0, 1, 0.01],
        fastcoef_lin: [0.1, 0.5, 0.01],
        initial_water_content: [0.065, 0.35, 0.005],
        layer_top_depth: [0.01, 0.1, 0.001],
    };

    sliderData = {
        conductivity: 0.00000005
    };

    var currentBasin;

    function setSlider(i) {
        $('#' + i).slider({
            min: value[0],
            max: value[1],
            value: value[0],
            step: value[2],
            slide: function (event, data) {
                $('.' + i + '-value').text(data.value);
                sliderData[i] = data.value;
            }
        });
    }

    // 获取图表
    function getComparisonChart(basinName) {
        $.get( "/chart/" + basinName + "/comparison", function( data ) {
            makeChart(data);
        });
    }

    // 弹出图表
    $('.show-chart').click(function () {
        currentBasin = $(this).data('basin');
        $.post('/param/' + currentBasin, sliderData, function (data) {
            for (var i in slideConfig) {
                if (data[i]) {
                    var value = Number(data[i]);
                    $('#' + i).slider('value', value);
                    $('.' + i + '-value').text(value.toFixed(2));
                    sliderData[i] = value;
                }
            }

            if (data['conductivity']) {
                var cValue = Number(data['conductivity']) * 100000;
                $('.conductivity-slider').slider('value', cValue);
                $('.conduct-slider-value').text(Number(data['conductivity']).toExponential(2));
                sliderData['conductivity'] = Number(data['conductivity']);
            }
        }).fail(function (err) {
            console.log(err);
        });

        $('#row-chart').hide();
        $('#row-progress').show();

        $('#chart-modal-title').text($(this).parent().prev().text());

        $('#modal-chart').off().on('shown.bs.modal');

        $('#modal-chart').on('shown.bs.modal', function () {
            getComparisonChart(currentBasin);
            $('#row-chart').show();
            $('#row-progress').hide();
        });

        $('#modal-chart').modal('show');
    });

    for (var i in slideConfig) {
        var value = slideConfig[i];

        var span = $('<span></span>', {
            class: i + '-value'
        }).text(value[0]);
        var h5 = $('<h5></h5>').append(i + '：', span);
        var innerDiv = $('<div></div>', {
            id: i,
            class: 'mySlider'
        });
        var outDiv = $('<div></div>', {
            class: 'col-lg-4 col-md-4 '
        }).append(h5, innerDiv);
        $('#params-console').append(outDiv);

        sliderData[i] = value[0];
        setSlider(i);
    }

    $('.conductivity-slider').slider({
        min: 0.005,
        max: 0.5,
        value: 0.005,
        step: 0.05,
        slide: function (event, data) {
            var value = (data.value / 100000).toExponential(2);
            $('.conduct-slider-value').text(value);
            sliderData.conductivity = data.value / 100000;
        }
    });

    // post slider's value
    $('#run-model').click(function () {

        $('#row-chart').hide();
        $('#row-progress').show();

        $.post("/run/" + currentBasin, sliderData, function (data) {
            $('#row-chart').popover({
                html: true,
                content: '<pre>' + data.result.replace(/\/n/, "<br />") + '</pre>',
                placement: 'top',
                trigger: 'hover',
                container: '#modal-chart',
                template: '<div class="popover popover-chart" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
            });
            getComparisonChart('luzhuang');
            $('#row-chart').show();
            $('#row-progress').hide();
        });
    });

    /*
    * 侧面板开始计算 交互
    * */
    var inTime = 0;
    function progress(id, value, time, callback) {
        inTime += time;
        setTimeout(function () {
            $(id).css({ 'width': value + '%' });
            if (callback) {
                setTimeout(function () {
                    callback();
                }, 100);
            }
        }, inTime);
        return progress;
    }


    $('#calculate').on('click', function () {
        $('#calculate').css('display', 'none');
        $('#detail').css('display', 'none');
        $('#data').css('display', 'block');

        progress('#progress-bar1', 30, 2000)
            ('#progress-bar1', 60, 1000)
            ('#progress-bar1', 90, 1000)
            ('#progress-bar1', 100, 3000)
            ('#progress-bar2', 100, 3000)
            ('#progress-bar4', 10, 500)
            ('#progress-bar4', 20, 500)
            ('#progress-bar4', 30, 500)
            ('#progress-bar4', 40, 500)
            ('#progress-bar4', 50, 500)
            ('#progress-bar4', 60, 500)
            ('#progress-bar4', 70, 500)
            ('#progress-bar4', 80, 500)
            ('#progress-bar4', 90, 500)
            ('#progress-bar4', 100, 500)
            ('#progress-bar5', 50, 1000)
            ('#progress-bar5', 100, 1000)
            ('#progress-bar6', 10, 200)
            ('#progress-bar6', 20, 200)
            ('#progress-bar6', 30, 200)
            ('#progress-bar6', 40, 200)
            ('#progress-bar6', 50, 200)
            ('#progress-bar6', 60, 200)
            ('#progress-bar6', 70, 200)
            ('#progress-bar6', 80, 200)
            ('#progress-bar6', 90, 200)
            ('#progress-bar6', 100, 200)
            ('#progress-bar7', 10, 200)
            ('#progress-bar7', 20, 200)
            ('#progress-bar7', 30, 200)
            ('#progress-bar7', 40, 200)
            ('#progress-bar7', 50, 200)
            ('#progress-bar7', 60, 200)
            ('#progress-bar7', 70, 200)
            ('#progress-bar7', 80, 200)
            ('#progress-bar7', 90, 200)
            ('#progress-bar7', 100, 200, function () {
                $('.progress-bar').removeClass('active');
                var myChart = echarts.init(document.getElementById('rainChart'));
                myChart.setOption(option);
            });

    });
}