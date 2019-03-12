$(function () {
    var API=`http://pg.cdongdong.com`; //接口变量

    //请求车品牌数据 start
    $.ajax({
        url: API+'/html/admin/?m=car&f=brand',
        type: 'GET',
        success: function (e) {
            
            var e = JSON.parse(e);
            //定义字母数组
            if (e.code != '0') {
                //consle.log('请求失败');
            } else {
                var json = e.message; //字符串转json
                var letter_arr = [];
                for (var j = 65; j <= 90; j++) {
                    if (j != 69 && j != 73 && j != 85 && j != 86) {
                        var x = String.fromCharCode(j);
                        letter_arr.push(x);
                    }
                }
                var maodian_html = '';
                for (var i = 0; i < letter_arr.length; i++) {
                    maodian_html += `<div class="maodain_son"> <a href="#${letter_arr[i]}">${letter_arr[i]} </a></div>`
                }
                $('.maodain').append(maodian_html);
                // var json = JSON.parse(e); //字符串转json
                var hot_data = json[0];

                var html = "";
                for (var i = 0; i < hot_data.length; i++) {
                    html += `<div class="car_hots_son" data-index=${i} data-id=${hot_data[i].id} data-name=${hot_data[i].name}>
                 <div class="car_m_img" >
                     <img src="./images/carModel_img/pinpai/${hot_data[i].id}.png" alt="" srcset="">
                 </div>
                 <div class="car_m_txt">${hot_data[i].name}</div>
             </div>`
                }
                $('.car_hots').append(html);
                var letter_html = '';
                for (var i = 0; i < letter_arr.length; i++) {
                    letter_html += `<div class="car_title" id="${letter_arr[i]}">${letter_arr[i]}</div>`;
                    if (json[letter_arr[i]]) {
                        var datas = json[letter_arr[i]];
                        // //consle.log(datas)
                        for (var j = 0; j < datas.length; j++) {
                            letter_html += `<div class="car_brand">
                        <div class="car_brand_son" data-index=${j} data-id=${datas[j].id} data-index=${j} data-name=${datas[j].name}>
                            <div class="car_brand_son_left">
                                <img src="./images/carModel_img/pinpai/${datas[j].id}.png" alt="" srcset="">
                            </div>
                            <div class="car_brand_son_cont">
                                <div class="son_cont_txt">${datas[j].name}</div>
                                <div class="son_cont_jiantou">
                                    <img src="./images/jiantou_right.png" alt="" srcset="">
                                </div>
                            </div>
                        </div>
                    </div>`
                        }

                    }
                }
                $('.car_box').append(letter_html)

            }
        }

    })
    var car_info = {} //车辆信息
    //点击热销车
    $('.car_hots').on('click', '.car_hots_son', function (e) {
        // //consle.log(e.currentTarget.dataset.id);
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        car_info.pinpai = name;
        ajax_towCar(id, name);


    })
    //点及品牌返回
    $('.title span').on('click', function () {
        var city_suer = storage.getItem('city_suer') || '';
        city_suer = JSON.parse(city_suer);
        //consle.log(city_suer);
        window.location.href = `./index.html?city=${city_suer.city}&stationid=${city_suer.stationid}`;
    })
    //点击所有车
    $('.car_box').on('click', '.car_brand_son', function (e) {
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        car_info.pinpai = name;
        ajax_towCar(id, name);
    })
    // 点击车系返回
    $('.series_title span').on('click', function () {
        $('.brank_alls').show();
        $('.series_alls').hide();
        $('.series_all').empty();
    })
    // 点击车系
    $('.series_all').on('click', '.series_all_son', function (e) {
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.name;
        car_info.chexi = name;
        ajax_threeCar(id, name);

    })
    // 点击车款返回
    $('.carModel_title').on('click', function () {
        $('.brank_alls').hide();
        $('.series_alls').show();
        $('.carModel_alls').hide();
        $('.carModel_all').empty();
    });
    var storage = window.localStorage; //定义localStorage
    // 点击车款
    $('.carModel_all').on('click', '.carModel_all_son', function (e) {
        var years = e.currentTarget.dataset.years;
        var id = e.currentTarget.dataset.id;
        var name = e.currentTarget.dataset.names;
        car_info.niankuan = years;
        car_info.series = name;
        //consle.log(car_info);
        car_info = JSON.stringify(car_info);
        storage.setItem('car_info', car_info);
        storage.setItem('carid', id);
        var city_suer = storage.getItem('city_suer') || '';
        city_suer = JSON.parse(city_suer);
        //consle.log(city_suer);
        window.location.href = `./index.html?city=${city_suer.city}&stationid=${city_suer.stationid}`;
    })

    //ajax请求车二级数据
    function ajax_towCar(id, name) {
        //consle.log(id);
        $.ajax({
            url: API+"/html/admin/?m=car&f=series",
            type: 'GET',
            data: {
                id: id
            },
            success: function (e) {
                var e = JSON.parse(e);
                //consle.log(e); 
                if (e.code != '0') {
                    //consle.log("请求失败")
                } else {

                    var series_html = '';
                    $('.brank_alls').hide();
                    $('.series_alls').show();
                    $('.series_title p').html(name);
                    var json = e.message;

                    for (var i = 0; i < json.length; i++) {
                        series_html += `<div class="series_all_son" data-index=${i} data-id=${json[i].id} data-name=${json[i].name}>${json[i].name}</div>`
                    }
                    $('.series_all').append(series_html);
                }

            }
        })
    }
    //请求车三级数据
    function ajax_threeCar(id, name) {
        $.ajax({
            url: API+"/html/admin/?m=car&f=seriestype",
            type: 'GET',
            data: {
                id: id
            },
            success: function (e) {
                var e = JSON.parse(e);
                if (e.code != '0') {
                    //consle.log('请求失败')
                } else {
                    $('.series_alls').hide();
                    $('.carModel_alls').show();
                    $('.carModel_title p').html(name)
                    var json = e.message;

                    var years = Object.keys(json);

                    var carModel_all_html = '';
                    for (var i = 0; i < years.length; i++) {
                        carModel_all_html += `<div class="carModel_all_title">${years[i]}</div>`;
                        if (json[years[i]]) {
                            var datas = json[years[i]]
                            for (var j = 0; j < datas.length; j++) {
                                carModel_all_html += `<div class="carModel_all_box">
                                <div class="carModel_all_son" data-years=${years[i]} data-index=${datas[j].index} data-names='${datas[j].name}' data-id=${datas[j].id}>
                                    ${datas[j].name}
                                </div>
                            </div>`;
                            }
                        }
                    }
                    $('.carModel_all').append(carModel_all_html);
                }

            }
        })
    }

})