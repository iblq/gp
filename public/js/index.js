/* eslint-disable no-undef */
function mapWindowResize(elementId) {
  var dom = $('#' + elementId);
  var offset = dom.offset();
  var height = $(document).height() - offset.top - 60;
  dom.css('height', height);
}

var fileLayer = [];

function nav() {
  var secLayer = [
    '潭头',
    '济源',
    '下孤山',
    '告成',
    '半店',
    '石寺',
    '白雀园',
    '芦庄',
    '朱阳',
    '栾川',
    '东湾',
    '横水',
    '驻马店',
    '韩城',
    '潭家河',
    '中汤',
    '卢氏',
    '娄子沟',
    '新县',
    '新安',
    '新郑',
    '李青店',
    '社旗',
    '米坪'
  ];
  $('.rotateLi').click(function() {
    // 图标旋转
    $(this)
      .children()
      .toggleClass('rotate90');
  });
}

$(function() {
  mapWindowResize('map');
  $('.sidebar-inner').load('nav.html', function() {
    $('.sidebar-inner li').click(function() {
      $('.sidebar-inner li').removeClass('active');
    });

    nav();
    setMap();

    // 济源小流域信息点击显示
    $('.show-rank-legend').click(function() {
      var basin = $(this).data('basin'); // jiyuan
      // 设置弹窗标题
      $('#legend-modal-title').text(
        $(this)
          .parent()
          .prev()
          .text() + '小流域信息'
      );
      // 显示弹窗
      $('#modal-legend').modal('show');
      // 隐藏所有内容
      $('.liuyu-info').hide();
      // 显示当前点击的内容
      $('#info-' + basin).show();
    });

    // 加载图例dom
    $('#tuliDiv').load('tuLi.html', function() {
      $('.tuliBtn').click(function() {
        $('#tuLi').hide();
      });
    });

    // 侧面板交互
    genSlider();

    $('#sideLayer').on('click', function() {
      $('#rightBar').toggleClass('show-hide');
      $('#btn-wrap').toggleClass('-show-hide');
    });

    // 读取文件内容
    function readFile(file) {
      var wb; //读取完成的数据
      var rABS = false; //是否将文件读取为二进制字符串

      function importf(f) {
        //导入
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {
              //手动转化
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

      function fixdata(data) {
        //文件流转BinaryString
        var o = '',
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l)
          o += String.fromCharCode.apply(
            null,
            new Uint8Array(data.slice(l * w, l * w + w))
          );
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      }

      importf(file);
    }

    function searchData(params) {
      $.get('/data/yuliang', params, function(res, err) {
        if (res && res.data.length > 0) {
          setFileChart(res.data, 'search-chart');
        } else {
          alert('搜索结果为空');
        }
      });
    }

    // 上传文件可视化
    $('#upload-container').load('modal.html', function() {
      $('#upload').click(function() {
        $('#modal-upload').modal('show');

        $('#file').change(function(e) {
          var file = e.target.files[0];
          readFile(file);
        });
      });

      // 数据搜索
      $('#search').click(function() {
        $('#modal-search').modal('show');
      });

      $('#searchBtn').click(function() {
        var type = $('#search-type').val();
        // var type = 'yuliang';
        var year = $('#year').val();
        var month = $('#month').val();

        if (!type) {
          alert('请先选择搜索类型');
          return;
        }
        searchData({ type: type, year: year, month: month });
      });

      // 点击地图数据可视化显示
      $('#upload-geo').click(function() {
        $('#modal-upload-geo').modal('show');

        // 上传文件输入框检测有选择文件时
        $('#file-geo').change(function(e) {
          var file = e.target.files[0];
          var data = new FormData();
          data.append('file', file);
          // 发送文件到服务器
          $.ajax({
            url: '/upload',
            data: data,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(result) {
              // 服务器收到文件并保存到public/uploads目录后返回文件访问路径 result
              // getGeojsonLayer 函数通过服务器文件路径生成图层
              var layer = getGeojsonLayer('/data/' + result);

              // 删除历史文件数据图层
              for (var i = 0; i < fileLayer.length; i++) {
                var layer = fileLayer[i];
                map.removeLayer(layer);
              }

              // 文件数据图层加载到地图
              map.addLayer(layer);
              fileLayer.push(layer);
              $('#modal-upload-geo').modal('hide');
            },
            error: function(err) {
              alert('上传失败');
            }
          });
        });
      });
    });
  });
});
