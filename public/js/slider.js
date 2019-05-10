function genSlider() {
  /*
   * 侧面板开始计算 交互
   * */
  var inTime = 0;
  function progress(id, value, time, callback) {
    inTime += time;
    setTimeout(function() {
      $(id).css({ width: value + '%' });
      if (callback) {
        setTimeout(function() {
          callback();
        }, 100);
      }
    }, inTime);
    return progress;
  }

  $('#calculate').on('click', function() {
    $('#calculate').css('display', 'none');
    $('#detail').css('display', 'none');
    $('#data').css('display', 'block');

    progress(
      '#progress-bar1',
      30,
      2000
    )('#progress-bar1', 60, 1000)('#progress-bar1', 90, 1000)('#progress-bar1', 100, 3000)('#progress-bar2', 100, 3000)('#progress-bar4', 10, 500)('#progress-bar4', 20, 500)('#progress-bar4', 30, 500)('#progress-bar4', 40, 500)('#progress-bar4', 50, 500)('#progress-bar4', 60, 500)('#progress-bar4', 70, 500)('#progress-bar4', 80, 500)('#progress-bar4', 90, 500)('#progress-bar4', 100, 500)('#progress-bar5', 50, 1000)('#progress-bar5', 100, 1000)('#progress-bar6', 10, 200)('#progress-bar6', 20, 200)('#progress-bar6', 30, 200)('#progress-bar6', 40, 200)('#progress-bar6', 50, 200)('#progress-bar6', 60, 200)('#progress-bar6', 70, 200)('#progress-bar6', 80, 200)('#progress-bar6', 90, 200)('#progress-bar6', 100, 200)('#progress-bar7', 10, 200)('#progress-bar7', 20, 200)('#progress-bar7', 30, 200)('#progress-bar7', 40, 200)('#progress-bar7', 50, 200)('#progress-bar7', 60, 200)('#progress-bar7', 70, 200)('#progress-bar7', 80, 200)('#progress-bar7', 90, 200)('#progress-bar7', 100, 200, function() {
      $('.progress-bar').removeClass('active');
      var myChart = echarts.init(document.getElementById('rainChart'));
      myChart.setOption(option);
    });
  });
}
