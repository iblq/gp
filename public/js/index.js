/* eslint-disable no-undef */
function mapWindowResize(elementId) {
    var dom = $('#' + elementId);
    var offset = dom.offset();
    var height = $(document).height() - offset.top - 60;
    dom.css('height', height);
}

// 获取url参数
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

// 注销
function logout() {
    $('#logoutBtn').click(function () {
        // $.post(logoutUrl, function (res) {
        //     if (res.status === 'sucess') {
        window.location.href = 'login.html';
        // }
        // })
    });
}

function nav() {
    var firstLayer = ["DEM", "土地利用", "土壤质地", "地貌响应单元", "影像", "HRU", "小流域", "河道节点", "雨量站", "水文站", "河道", "市界", "流域列表"];
    var secLayer = ["潭头", "济源", "下孤山", "告成", "半店", "石寺", "白雀园", "芦庄", "朱阳",
        "栾川", "东湾", "横水", "驻马店", "韩城", "潭家河", "中汤", "卢氏", "娄子沟", "新县",
        "新安", "新郑", "李青店", "社旗", "米坪"
    ];
    $(".rotateLi").click(function () { // 图标旋转
        $(this).children().toggleClass('rotate90');
    });
}


$(function () {
    mapWindowResize('map');
    $('.sidebar-inner').load('nav.html', function () {


        $('.sidebar-inner li').click(function () {
            $('.sidebar-inner li').removeClass('active');
        });

        nav();
        logout();
        map();

        $('.show-rank-legend').click(function () {
            var basin = $(this).data('basin');
            $('#legend-modal-title').text($(this).parent().prev().text() + '统计');
            $('#modal-legend').modal('show');
            $('.legend-content').hide();
            $('#legend-content-' + basin).show();
        });

        // 加载图例dom
        $('#tuliDiv').load('tuLi.html', function () {
            $('.tuliBtn').click(function () {
                $('#tuLi').hide();
            });
        });

        // 用户名设置
        var username = findGetParameter('username');
        username = username === 'admin' ? "管理员" : username;
        $('#username>strong').text(username);

        //参数滑块
        $("#param-slider").slider();

        //芦庄 弹窗滑块
        genSlider();

        /*显示隐藏雨图流量图*/

        $('#sideLayer').on('click', function () {
            $('#rightBar').toggleClass('show-hide');
        });

        // 读取文件内容
        function readFile(file) {
            var wb; //读取完成的数据
            var rABS = false; //是否将文件读取为二进制字符串

            function importf(f) { //导入
                var reader = new FileReader();
                reader.onload = function (e) {
                    var data = e.target.result;
                    if (rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), { //手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                    var excelData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    // 生成图表
                    setFileChart(excelData);
                };
                if (rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            }

            function fixdata(data) { //文件流转BinaryString
                var o = "",
                    l = 0,
                    w = 10240;
                for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            }

            importf(file);
        }

        function searchData(params) {
            $.get('/data/yuliang', params, function (res, err) {
                if (res && res.data.length > 0) {
                    setFileChart(res.data, 'search-chart');
                } else {
                    alert('搜索结果为空');
                }
            });
        }

        // 上传文件可视化
        $("#upload-container").load("modal.html", function () {
            $('#upload').click(function () {
                $('#modal-upload').modal('show');

                $('#file').change(function (e) {
                    var file = e.target.files[0];
                    readFile(file);
                });
            });

            // 数据搜索
            // $("#search-type").selectmenu();
            // $("#year").selectmenu();
            // $("#month").selectmenu();

            $('#search').click(function () {
                $('#modal-search').modal('show');
            });

            $('#searchBtn').click(function () {
                // var type = $("#search-type").val();
                var type = 'yuliang';
                var year = $("#year").val();
                var month = $("#month").val();

                if (!type) {
                    alert('请先选择搜索类型');
                    return;
                }

                console.log(type);
                console.log(year);
                console.log(month);

                searchData({type:type, year:year,month: month});
            });

        });
    });
});
