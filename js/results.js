$(function () {
    var API=`http://pg.cdongdong.com`; //接口变量
    // 显示缓冲
    $('.loading_box').show();
    var storage = window.localStorage; //定义localStorage
    var test = decodeURI(window.location.search) || ''; //url中参数为中文时候不乱码
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
    // var test = 'http://i5xa3c.natappfree.cc/car_evaluate/results.html';
    // var test = 'http://i5xa3c.natappfree.cc/car_evaluate/results.html?por_id=201';
    if (getUrlVars(test).id == '000') {
      
        var line_type = 'xianshang';
        storage.setItem('line_type', line_type);
    } else {
        var user_res = {
            message: getUrlVars(test).id
        };
        var line_type = 'xianxia';
        storage.setItem('user_res', JSON.stringify(user_res));
        storage.setItem('line_type', line_type);
    }
    //点击返回
    $('.title span').on('click', function () {
        window.location.href = './index.html';
    })
    //读取首页缓存

    var req_date = storage.getItem('req_date') || '';
    var user_res = storage.getItem('user_res') || '';

    if (!user_res) {
     
        window.location.href = './index.html';
    } else {
        // req_date = JSON.parse(req_date);
        //consle.log(user_res);
        user_res = JSON.parse(user_res);
        //consle.log(user_res);
        var id = user_res.message;
        //consle.log(id)
        // 读取到的数据渲染到页面
        // $('.car_title').html(req_date.car_info.pinpai + ' ' + req_date.car_info.series);
        // $('.city').html(req_date.city);
        // $('.miles').html(req_date.miles + '万公里');
        // $('.regdate').html(req_date.regdate);
        // //consle.log(req_date);
        // 发送ajax请求
        var timestamp = (new Date()).getTime();
        //consle.log(timestamp);
        $.ajax({
            url: API+'/html/admin/?m=car&f=screat',
            type: 'POST',
            data: {
                id: id
            },
            success: function (e) {
                //consle.log(e);
                var e = JSON.parse(e);
                if (e.code == 0) {
                    //consle.log(e.message);
                    var QM = e.message;
                    //consle.log(QM)
                    $.ajax({
                        url: API+"/html/admin/?m=car&f=evaluate",
                        type: 'POST',
                        data: {
                            id: id,
                            sign: QM
                        },
                        success: function (e) {
                            //consle.log(QM)
                            e = JSON.parse(e);
                            if (e.code == 0) {
                                $('.loading_box').hide();
                                //consle.log(e);
                                //consle.log(id);
                                // 车辆信息 赋值
                                $('.car_title').html(e.message.por_name);
                                $('.city').html(e.message.por_city);
                                //存入 城市 检测站id
                                storage.setItem('por_city', e.message.por_city);
                                storage.setItem('por_stationid', e.message.por_stationid);

                                $('.miles').html(e.message.por_mileage + '万公里');
                                $('.regdate').html(e.message.por_cardtime.substring(0, 7));
                                $('.regdate_c').html(e.message.por_cardtime.substring(0, 5)+'01');
                                
                                var res_date = e;
                                storage.setItem('res_date', JSON.stringify(res_date));
                                var get_phone = e.message.por_phone; //获取手机号
                                storage.setItem('get_phone', get_phone);

                                // 优秀 赋值 start
                                var por_level_a = e.message.por_level_a;
                                por_level_a = JSON.parse(por_level_a);
                                //consle.log(por_level_a);
                                var individual_high_sold_price = por_level_a.individual_high_sold_price;
                                //consle.log(individual_high_sold_price)
                                var individual_low_sold_price = por_level_a.individual_low_sold_price;
                                //consle.log(individual_low_sold_price)
                                // 赋值
                                $('.car_youxiu').html(`${individual_low_sold_price} ~ ${individual_high_sold_price}`);
                                var num = (individual_high_sold_price + individual_low_sold_price) / 2;
                                //consle.log(num)
                                var por_trenddata = e.message.por_trenddata;
                                por_trenddata = JSON.parse(por_trenddata); //未来趋势 数据
                                individual_high_sold_price = (individual_high_sold_price / 100 * 80).toFixed(2)
                                storage.setItem('individual_high_sold_price', individual_high_sold_price) //存入预计出售价
                                // 未来趋势赋值
                                //年 
                                $('.year1').html(por_trenddata[0].register_year + '年');
                                $('.year2').html(por_trenddata[1].register_year + '年');
                                $('.year3').html(por_trenddata[2].register_year + '年');
                                //车价
                                $('.trend_cost1').html(por_trenddata[0].eval_price + '万元');
                                $('.trend_cost2').html(por_trenddata[1].eval_price + '万元');
                                $('.trend_cost3').html(por_trenddata[2].eval_price + '万元');
                                //车价控制蓝色比例
                                var n_num = por_trenddata[0].eval_price;
                                var t_num = por_trenddata[1].eval_price;
                                var s_num = por_trenddata[2].eval_price;
                                var x1 = ((t_num / n_num) * 100).toFixed(0) - 12;
                                var x2 = ((s_num / n_num) * 100).toFixed(0) - 20;
                                $('.act_son2').css('height', x1 + '%');
                                $('.act_son3').css('height', x2 + '%');
                                var mean = (((n_num - s_num) / 36) * 10000).toFixed(2); //每月下降
                                //consle.log(mean)
                                $('.expected span').html(mean + '元');
                                //consle.log(mean)



                                //consle.log(por_trenddata);
                                //consle.log(individual_low_sold_price);
                                //consle.log(individual_high_sold_price);

                                $('.interval_left_txt').html(individual_high_sold_price + '万元');
                                $('.interval_cont_txt').html(num.toFixed(2) + '万元');
                                $('.interval_right_txt').html(individual_low_sold_price + '万元');

                                //优秀 赋值 end

                                // 良好 赋值 start
                                var por_level_b = e.message.por_level_b;
                                por_level_b = JSON.parse(por_level_b);
                                //consle.log(por_level_b);
                                var individual_high_sold_price = por_level_b.individual_high_sold_price;
                                var individual_low_sold_price = por_level_b.individual_low_sold_price;
                                $('.car_lianghao').html(individual_low_sold_price + ' ~ ' + individual_high_sold_price);
                                //良好 赋值 end

                                // 一般 赋值 start
                                var por_level_c = e.message.por_level_c;
                                por_level_c = JSON.parse(por_level_c);
                                //consle.log(por_level_c);
                                var individual_high_sold_price = por_level_c.individual_high_sold_price;
                                var individual_low_sold_price = por_level_c.individual_low_sold_price;
                                $('.car_yiban').html(individual_low_sold_price + ' ~ ' + individual_high_sold_price);
                                //一般 赋值 end
                            } else {
                                $('.loading_title').show();
                                var city_suer = storage.getItem('city_suer') || '';
                                city_suer = JSON.parse(city_suer);
                                //consle.log(city_suer);
                                setInterval(() => {
                                    window.location.href = `./index.html?city=${city_suer.city}&stationid=${city_suer.stationid}`;
                                }, 3000);

                            }


                        }
                    })
                }


            }

        })

    }
    // 点击home 回到首页
    $('.suspend').on('click', function () {
        var por_city = storage.getItem('por_city') || '';
        var por_stationid = storage.getItem('por_stationid') || '';
        //consle.log(por_city);
        window.location.href = `./index.html?city=${por_city}&stationid=${por_stationid}`;
    })
    // 点击高价售车
    $('.footer_but_right').on('click', function () {
        window.location.href = './valuation.html'
    })
    // 点击新车

    $('.buy_cars').on('click', function () {
        var get_phone = storage.getItem('get_phone') || '';
        //consle.log(get_phone);
        $.ajax({
            url: API+'/html/admin/?m=car&f=count',
            type: 'POST',
            data: {
                phone: get_phone,
                type: '3'
            },
            success: function (e) {
                //consle.log(e);
                window.location.href = 'http://growth.maodou.com/market/redirect?ca_s=bd_chedongdong&ca_n=chedongdongxc&platform=2';
            }
        })


    });
    //点击车抵贷
    $('.footer_but_left').on('click', function () {
        var get_phone = storage.getItem('get_phone') || '';
        $.ajax({
            url: API+'/html/admin/?m=car&f=count',
            type: 'POST',
            data: {
                phone: get_phone,
                type: '1'
            },
            success: function (e) {
                //consle.log(e);
                window.location.href = 'https://static1.weidai.com.cn/static/callcenter/h5/07/carCpc/index.html?channelCode=XCHAAAX';
            }
        })

    })

})