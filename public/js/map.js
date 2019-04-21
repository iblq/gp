function map() {

    // 加载天地图底图
    var tian_di_tu_road_layer = new ol.layer.Tile({
        title: "天地图路网",
        source: new ol.source.XYZ({
            url: "http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=f1a5b2c434607d3ebf3552166c3b4dc3"
        })
    });

    var tian_di_tu_annotation = new ol.layer.Tile({
        title: "天地图文字标注",
        source: new ol.source.XYZ({
            url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=f1a5b2c434607d3ebf3552166c3b4dc3'
        })
    });

    // 定义地图 map 对象
    var map = new ol.Map({
        target: 'map',
        layers: [
            tian_di_tu_road_layer,
            tian_di_tu_annotation
        ],
        // 设置视图中心为河南省坐标
        view: new ol.View({
            projection: 'EPSG:900913',
            center: [12579102.46, 4028802.03],
            zoom: 7
        })
    });

    var view = map.getView();

    // 定义线条样式
    function lineStyle(color, width) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: width
            })
        });
    }

    // 点样式
    function pointStyle(color, width) {
        return new ol.style.Style({
            image: new ol.style.Circle({
                radius: width,
                fill: new ol.style.Stroke({
                    color: color,
                    width: width
                }),
                stroke: new ol.style.Stroke({
                    color: color,
                    width: width
                })
            }),
            zIndex: 2000
        });
    }

    // 河南省边界线图层
    var henan84 = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'js/geojson/henan84.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: lineStyle("purple", 3)
    });
    // 市界
    var henan_city84 = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'js/geojson/henan_city84.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: lineStyle("purple", 2)
    });

    var GeoJSONFormat = new ol.format.GeoJSON();

    // 河道节点图层
    var node = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/data/node',
            format: GeoJSONFormat
        }),
        style: pointStyle("red", 1)
    });
// 雨量站
    var ylzSource = new ol.source.Vector({
        url: '/data/ylz',
        format: GeoJSONFormat
    });
    var ylz = new ol.layer.Vector({
        source: ylzSource,
        style: pointStyle("blue", 1)
    });
// 水文站
    var swzSource = new ol.source.Vector({
        url: '/data/swz',
        format: GeoJSONFormat
    });
    var swz = new ol.layer.Vector({
        source: swzSource,
        style: pointStyle("green", 3)
    });

    map.addLayer(henan84); //添加图层？

    var source = new ol.source.Vector({
        wrapX: false
    });
    var vector = new ol.layer.Vector({
        source: source
    });

    map.addLayer(vector);

    var layers = {
        "河道节点": node,
        "雨量站": ylz,
        "水文站": swz,
        "市界": henan_city84
    };


    var navDiv = $('.sidebar-inner');
    var layerCheck = $('.specialLayers');
    var tuliNo = 0;

    layerCheck.click(function (event, data) { // 点击切换图层显示
        var name = $(this).parent().text().trim();
        var index = $(this).index();
        if (this.checked) {
            map.addLayer(layers[name]);
        } else {
            map.removeLayer(layers[name]);
        }

    });

    //  14个小流域 点击显示
    var liuyu14 = {
        '石寺': ['shisi', [12467501, 4149869]],
        '下孤山': ['xiagushan', [12534350, 4016944]],
        '驻马店': ['zhumadian', [12686959, 3887630]],
        '中汤': ['zhongtang', [12513775, 3995184]],
        '新郑': ['xinzheng', [12623218, 4094565]],
        '半店': ['bandian', [12436940, 3879169]],
        '潭头': ['tantou', [12416101, 4033716]], 
        '济源': ['jiyuan', [12522611, 4184086]],
        '芦庄': ['luzhuang', [12662449, 3863678]],
        '栾川': ['luanchuan', [12408623, 4003995]],
        '李青店': ['liqingdian', [12499862, 3977456]],
        '娄子沟': ['louzigou', [12489972, 4017548]],
        '新县': ['xinxian', [12792498, 3708943]],
        '新安': ['xinan', [12450110, 4135668]],
        //'告成': ['gaocheng', [12578983, 4085036]],
        //'白雀园': ['baiqueyuan', [12817844, 3725019]],
        '米坪': ['miping', [12377075, 3999662]],
        //'潭家河': ['tanjiahe', [12691045, 3741908]],
        //'韩城': ['hancheng', [12442712, 4110965]],
    };

    // 生成小流域图层函数
    function setGeoLayer(jsonName) {
        return new ol.layer.Vector({
            source: new ol.source.Vector({
                url: 'js/geojson/' + jsonName + '.geojson',
                format: new ol.format.GeoJSON()
            }),
            style: lineStyle("#C0FF3E", 2)
        });
    }

    function setLiuyu14Layer() {
        var liuyu14Layers = {};

        for (var i in liuyu14) {
            liuyu14Layers[liuyu14[i][0]] = setGeoLayer(liuyu14[i][0]);
        }
        return liuyu14Layers;
    }

    var liuyu14Layers = setLiuyu14Layer();

    // 显示小流域位置
    function showOneLiuyu(name, duration) {
        if (liuyu14[name]) {
            map.addLayer(liuyu14Layers[liuyu14[name][0]]);

            // 地图飞行效果
            view.animate({
                center: liuyu14[name][1],
                zoom: 10,
                duration: duration,
                easing: ol.easing.easeOut
            });
        }
    }

    //  流域列表点击
    $('.secItems').click(function (e) {
        var index = $(this).index();
        var name = $(this).parent().text().trim();
        if (this.checked) {
            $(this).parent().parent().next().removeClass('hidden');
            showOneLiuyu(name, 1000);
        } else {
            $(this).parent().parent().next().addClass('hidden');

            if (liuyu14[name] && liuyu14Layers[liuyu14[name][0]]) { 
                map.removeLayer(liuyu14Layers[liuyu14[name][0]]);
            }
        }
    });


    // 按住 ctrl 框选地图
    var select = new ol.interaction.Select();
    map.addInteraction(select);

    var selectedFeatures = select.getFeatures();

    // a DragBox interaction used to select features by drawing boxes
    var dragBox = new ol.interaction.DragBox({
        condition: ol.events.condition.platformModifierKeyOnly
    });

    map.addInteraction(dragBox);

    var detailBox = document.getElementById('detail');

    var dragRectLayer = new ol.layer.Vector();

    dragBox.on('boxend', function () {
        // features that intersect the box are added to the collection of
        // selected features
        var extent = dragBox.getGeometry().getExtent();
        // infoBox.innerHTML = '<span>' + extent + '</span>';
        detailBox.innerHTML = extent;
        console.log(extent);


        //   拉框完毕显示相关信息

        $('#rightBar').removeClass('show-hide');

        // 显示框选的矩形       
        var dragRect = new ol.source.Vector();
        dragRect.addFeature(new ol.Feature(new ol.geom.LineString([
            [extent[0], extent[1]],
            [extent[0], extent[3]]
        ])));
        dragRect.addFeature(new ol.Feature(new ol.geom.LineString([
            [extent[0], extent[1]],
            [extent[2], extent[1]]
        ])));
        dragRect.addFeature(new ol.Feature(new ol.geom.LineString([
            [extent[0], extent[3]],
            [extent[2], extent[3]]
        ])));
        dragRect.addFeature(new ol.Feature(new ol.geom.LineString([
            [extent[2], extent[1]],
            [extent[2], extent[3]]
        ])));

        dragRectLayer = new ol.layer.Vector({
            source: dragRect,
            style: lineStyle("blue", 2)
        });
        map.addLayer(dragRectLayer);

        ylzSource.forEachFeatureInExtent(extent, function (feature) {
            selectedFeatures.push(feature);
        });
    });

    // 开始时清楚历史框选记录
    dragBox.on('boxstart', function () {
        map.removeLayer(dragRectLayer);
        selectedFeatures.clear();
    });

    // 节点框选中时记录统计
    selectedFeatures.on(['add', 'remove'], function () {
        var names = selectedFeatures.getArray().map(function (feature) {
            return feature.get('站名');
        });
        if (names.length > 0) {
            detailBox.innerHTML = '已选中的站点：' + names.join(', ');
        } else {
            detailBox.innerHTML = 'No countries selected';
        }
    });


}