function genSlider() {
  /*
   * 侧面板开始计算 交互
   * */
  $('#calculate').on('click', function() {
    $('#calculate').css('display', 'none');
    $('#detail').css('display', 'none');
    $('#data').css('display', 'block');

    var myChart = echarts.init(document.getElementById('rainChart'));
    myChart.setOption(option);
  });
}
