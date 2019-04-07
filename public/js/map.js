function map() {

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

    var henanDEMTile = new ol.layer.Tile({
        title: "DEM",
        source: new ol.source.XYZ({
            url: 'http://210.77.68.213:27011/henan_dem/{z}/{x}/{y}'
        })
    });

    var henanLandUseTile = new ol.layer.Tile({
        title: "土地利用",
        source: new ol.source.XYZ({
            url: 'http://210.77.68.213:27011/henan_land_use_v2/{z}/{x}/{y}'
        })
    });

    var henanSoilTextureTile = new ol.layer.Tile({
        title: "土壤质地",
        source: new ol.source.XYZ({
            url: 'http://210.77.68.213:27011/soil_texture/{z}/{x}/{y}'
        })
    });

    var henanRiverTile = new ol.layer.Tile({
        title: "河流",
        source: new ol.source.XYZ({
            url: 'http://210.77.68.213:27011/henan_river/{z}/{x}/{y}'
        })
    });

    var rankTile = new ol.layer.Tile({
        title: "地貌响应单元",
        source: new ol.source.XYZ({
            url: 'http://210.77.68.213:27011/basin_rank_v2/{z}/{x}/{y}'
        })
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            tian_di_tu_road_layer,
            tian_di_tu_annotation
        ],
        view: new ol.View({
            projection: 'EPSG:900913',
            center: [12579102.46, 4028802.03],
            zoom: 7
        })
    });

    var view = map.getView();

    function lineStyle(color, width) {
        return new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: color,
                width: width
            })
        });
    }

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

    var henan84 = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'js/geojson/henan84.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: lineStyle("purple", 3)
    });
    var henan_city84 = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'js/geojson/henan_city84.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: lineStyle("purple", 2)
    });

    var GeoJSONFormat = new ol.format.GeoJSON();

    var node = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: '/data/node',
            format: GeoJSONFormat
        }),
        style: pointStyle("red", 1)
    });

    var ylzSource = new ol.source.Vector({
        url: '/data/ylz',
        format: GeoJSONFormat
    });
    var ylz = new ol.layer.Vector({
        source: ylzSource,
        style: pointStyle("blue", 1)
    });

    var swzSource = new ol.source.Vector({
        url: '/data/swz',
        format: GeoJSONFormat
    });
    var swz = new ol.layer.Vector({
        source: swzSource,
        style: pointStyle("green", 3)
    });

    map.addLayer(henan84); //添加图层？
    // map.addLayer(henan_city84);



    var source = new ol.source.Vector({
        wrapX: false
    });
    var vector = new ol.layer.Vector({
        source: source
    });

    map.addLayer(vector);

    var layers = {
        "DEM": henanDEMTile,
        "土壤质地": henanSoilTextureTile,
        "地貌响应单元": rankTile,
        "影像": rankTile,
        "HRU": rankTile,
        "河道节点": node,
        "雨量站": ylz,
        "水文站": swz,
        "河道": henanRiverTile,
        "市界": henan_city84
    };

    // 图例div排序控制显示隐藏
    var tuliDivNo = {
        "土壤质地": 'TRZD',
        "土地利用": 'TDLY',
        "地貌响应单元": 'RANK'
    };

    var navDiv = $('.sidebar-inner');
    var layerCheck = $('.specialLayers');
    var tuliNo = 0;
    layerCheck.click(function (event, data) { // 点击切换图层显示
        var name = $(this).parent().text().trim();
        var index = $(this).index();
        if (this.checked) {
            map.addLayer(layers[name]);
            // 图例
            if (tuliDivNo[name]) {
                $('#tuLi').show();

                $('.tuLiBody>div[ref=' + tuliDivNo[name]).show();
                tuliNo += 1;
            }

        } else {
            map.removeLayer(layers[name]);
            if (tuliDivNo[name]) {
                $('.tuLiBody>div[ref=' + tuliDivNo[name]).hide();
                tuliNo -= 1;
                if (tuliNo === 0) {
                    $('#tuLi').hide();
                }
            }
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

    function showOneLiuyu(name, duration) {
        if (liuyu14[name]) {
            map.addLayer(liuyu14Layers[liuyu14[name][0]]);

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

    // navbar 透明度调节
    $('.navSlide').slider({
        max: 1,
        min: 0.3,
        step: 0.1,
        value: 1,
        change: function (e, ui) {
            // var ref = $(this).attr('ref');
            // featureLayers[ref].opacity = ui.value;
        }
    });

    // a normal select interaction to handle click
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

        // show drag rectangle       
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

    // clear selection when drawing a new box and when clicking on the map
    dragBox.on('boxstart', function () {
        map.removeLayer(dragRectLayer);
        selectedFeatures.clear();
    });

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