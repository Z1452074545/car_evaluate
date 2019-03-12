$(function () {
    var API=`http://pg.cdongdong.com`; //接口变量
    var req_date = {
        stationid: "1",
        city: "北京"
    }; //点击评估上传的信息
    var storage = window.localStorage; //定义localStorage
    var test = decodeURI(window.location.search) || ''; //url中参数为中文时候不乱码
    //     var da = test.substr(1); //去掉?
    //     alert(da); //将url参数转为数组;
    // alert(test);
    //    //url参数转对象
    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
        }
        return myJson;
    }
    // var test = '?stationid=1&city=北京';

    //consle.log(getUrlVars(test));
    var city_user = getUrlVars(test);
    req_date.city = city_user.city;
    req_date.stationid = city_user.stationid;
    city_suer = JSON.stringify(city_user);
    storage.setItem('city_suer', city_suer);
    //consle.log(req_date);
    //取车型缓存
    var storage = window.localStorage; //定义localStorage
    var car_info = storage.getItem('car_info') || '';
    if (!car_info) {
        //consle.log('木得缓存');
        $('.get_deta').on('click', function () {
            $.toast("请先选择车辆型号", "text");
        })
    } else {
        //consle.log(JSON.parse(car_info));
        car_info = JSON.parse(car_info);
        var car_str = `${car_info.pinpai} ${car_info.chexi} ${car_info.series}`;
        //consle.log(car_str);
        $('#car_type').val(car_str);
        var niankuan = car_info.niankuan;
        $('.get_deta').on('click', function () {
            storage.setItem('niankuan', niankuan);
            window.location.href = './get_deta.html';
        })

    }
    //从缓存取时间
    var car_deta = storage.getItem('car_deta') || '';
    if (!car_deta) {
        //consle.log('木得缓存');
    } else {
        $('.get_deta').text(car_deta).removeClass('col_green');

    }

    $("#city-picker").cityPicker({ // 地区
        title: "请选择上牌地区",
        showDistrict: false
    });
    $("#date_input").calendar(); // 时间
    $("#but_car_type").on('click', function () { //车型
        //consle.log(1);
        storage.removeItem('car_deta');
        window.location.href = "./car_type.html";
    })
    $('#city_inp').on('click', function () {
        window.location.href = "cityall.html"
    })

    // 从缓存获取地点
    var gundong_inp = $('.gundong input').val();
    if (!gundong_inp) {
        $('.gundong input').removeClass('gundong_d');
    } else {
        $('.gundong input').addClass('gundong_d');
    }
    var city = window.localStorage.getItem('city') || '';
    //consle.log(city);
    $('#city_inp').val(city); // 赋值到页面
    window.onload = function () { //页面加载完成后加载
        //    $('#car_type_pop').load('http://jc.cdongdong.com/inspection/html/h5/?m=usedcarsurvey&f=brand');
    }
    var countdown = 60; //倒计时
    function settime(obj) { //发送验证码倒计时
        if (countdown == 0) {
            obj.removeAttr("disabled");
            obj.removeClass('code_back');
            obj.val("获取");
            countdown = 60;
            return;
        } else {
            obj.attr("disabled", "disabled");
            obj.addClass('code_back');
            obj.val(countdown + "s");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }
    var car_info = {}; //获取信息
    //点击 开始评估
    //consle.log(req_date);
    $(".but_evaluate").on('click', function () {
        var reg_phone = /^1[34578]\d{9}$/;
        var reg_n = /^[1-9]+[0-9]*]*$/
        car_info.car_license_location = $('#city_inp').val(); // 地点
        car_info.car_license_date = $('.get_deta').text(); // 时间
        //consle.log(car_info.car_license_date);
        car_info.car_license_carType = $('#car_type').val(); // 车型
        car_info.car_license_mileage = $('#car_mileage').val(); // 里程
        car_info.car_license_phone = $('#phone').val(); // 电话
        // if (!car_info.car_license_location) {
        //     $.toast("上牌地区不能为空", "text");
        // } else 
        if (!car_info.car_license_date) {
            $.toast("上牌时间不能为空", "text");
        } else if (!car_info.car_license_carType) {
            $.toast("车型不能为空", "text");
        } else if (!car_info.car_license_mileage) {
            $.toast("里程不能为空", "text");
        } else if (car_info.car_license_mileage > 60) {
            $.toast("不能大于60万公里", "text");
        } else if (!reg_n.test(car_info.car_license_mileage)) {
            $.toast("里程必须为数字", "text");
        } else if (!car_info.car_license_phone) {
            $.toast("联系人不能为空", "text");
        } else if (!reg_phone.test(car_info.car_license_phone)) {
            $.toast("联系方式错误", "text");
        } else {
            //consle.log(car_info);


            var caro_info = storage.getItem('car_info') || '';
            var carid = storage.getItem('carid') || '';
            caro_info = JSON.parse(caro_info);
            req_date.car_info = caro_info;
            req_date.regdate = car_info.car_license_date;
            req_date.miles = car_info.car_license_mileage;
            req_date.phone = car_info.car_license_phone;
            req_date.cityid = '12';
            // req_date.city = '';
            // req_date.stationid = '';
            req_date.carid = carid;
            req_date.from = '1';
            //consle.log(req_date);
            $('.loading_box').show();
            //发送ajax请求
            //consle.log(req_date);
            //组成签名参数 时间戳
            var timestamp = (new Date()).getTime();
            //consle.log(timestamp);
            var screat=`carid${req_date.carid}phone${req_date.phone}miles${req_date.miles}`;
            //consle.log(screat);
            //获取签名
            $.ajax({
                url: API+'/html/admin/?m=car&f=screat',
                type: 'POST',
                data: {
                    screat:screat
                },
                success: function (e) {
                    //consle.log(e);
                    var e=JSON.parse(e);
                    req_date.sign=e.message;
                    //consle.log(req_date);
                    $.ajax({
                        url: API+'/html/admin/?m=car&f=pinggu',
                        type: 'POST',
                        data: req_date,
                        success: function (e) {
                            //consle.log(req_date);
                            //consle.log(e);
                            var storage = window.localStorage; //定义localStorage
                            storage.setItem('user_res', e);
                            storage.setItem('req_date', JSON.stringify(req_date));
                            // //consle.log(e);
                            // e = JSON.parse(e);
                            // var por_id = e.message;
                            // //consle.log(por_id);

                            // window.location.href = "http://i5xa3c.natappfree.cc/car_evaluate/results.html";
                            window.location.href = `./results.html?id=000`;
                            $('.loading_box').hide();
                        }
                    })
                }
            })


        }
    })

    //点击 我要买车
    $('.but_buyCars').on('click', function () {
        //consle.log('我要买车');
        var inp_code = $('#inp_code').val();
        //逃避现实和过去
        //consle.log(inp_code);
        var code = '1234';
        if (inp_code != code) {
            $.toast("验证码错误", "text");
        } else {
            //consle.log('跳转');
            // window.location.href = ""
        }
    })
})