$(function () {
    var API=`http://pg.cdongdong.com`; //接口变量
    //读取首页缓存
    var storage = window.localStorage; //定义localStorage
    var req_date = storage.getItem('req_date') || '';
    var user_res = storage.getItem('user_res') || '';
    var res_date = storage.getItem('res_date') || '';
    //consle.log(user_res);
    if (!user_res) {
        //consle.log('木得缓存');
        // window.location.href = './index.html';
    } else {
        // req_date = JSON.parse(req_date);
        // //consle.log(user_res);
        user_res = JSON.parse(user_res);
        //consle.log(user_res);
        // 读取到的数据渲染到页面
        var e = JSON.parse(res_date);
        //consle.log(e);
        // 车辆信息 赋值
        $('.car_title').html(e.message.por_name);
        $('.city').html(e.message.por_city);
        $('.miles').html(e.message.por_mileage + '万公里');
        $('.regdate').html(e.message.por_cardtime.substring(0, 7));
        $('.regdate_c').html(e.message.por_cardtime.substring(0, 5)+'01');
        //consle.log(e.message.por_cardtime.substring(0, 7));
        // 电话号码赋值
        $('.anticipated_title_right input').val(e.message.por_phone);
        //预计出售价
        var individual_high_sold_price = storage.getItem('individual_high_sold_price') || '';
        $('.anticipated_title_right span').html(individual_high_sold_price);



        // $('.car_title').html(req_date.car_info.pinpai + ' ' + req_date.car_info.series);
        // $('.city').html(req_date.city);
        // $('.miles').html(req_date.miles + '万公里');
        // $('.regdate').html(req_date.regdate);
        // //consle.log(req_date);
    }
    //点击 车款下拉收起
    // $('.car_title').on('click',function(){
    //     $('.car_tit_cont').slideToggle();
    // })
    //点击返回
    $('.title span').on('click', function () {
        // location.href = './results.html';
        window.history.go(-1);
    })
    //点击 我要售车
    $('.sell_but').on('click', function () {
        var reg_phone = /^1[34578]\d{9}$/;
        var get_phone = $('.anticipated_title_right input').val();
        if (!reg_phone.test(get_phone)) {
            //consle.log('不对');
            $('.tit_pop').show();
            setInterval(() => {
                $('.tit_pop').hide();
            }, 2000);

        } else {
            //consle.log(get_phone);
            //ajax
            $.ajax({
                url: API+'/html/admin/?m=car&f=count',
                type: 'POST',
                data: {
                    phone: get_phone,
                    type: '2'
                },
                success: function (e) {
                    var storage = window.localStorage; //定义localStorage
                    var line_type = storage.getItem('line_type') || '';
                    // user_res = JSON.parse(user_res);
                    //consle.log(e);
                    // //consle.log(user_res.message);
                    if (line_type == 'xianshang') {

                        $('.line_shang_pop').show();
                        $('.pop_xiansgang').show();

                        setInterval(() => {
                            var por_city = storage.getItem('por_city') || '';
                            var por_stationid = storage.getItem('por_stationid') || '';
                            window.location.href='http://growth.maodou.com/market/redirect?ca_s=bd_chedongdong&ca_n=chedongdongxc&platform=2'; //新车
                            setInterval(() => {
                                $('.line_shang_pop').hide();
                                $('.pop_xiansgang').hide();
                            }, 2000);

                        }, 2000);


                    } else {
                        $('.line_shang_pop').show();
                        $('.pop_xianxia').show();
                        setInterval(() => {
                            var por_city = storage.getItem('por_city') || '';
                            var por_stationid = storage.getItem('por_stationid') || '';
                            window.location.href='http://growth.maodou.com/market/redirect?ca_s=bd_chedongdong&ca_n=chedongdongxc&platform=2'; //新车
                            setInterval(() => {
                                $('.line_shang_pop').hide();
                                $('.pop_xianxia').hide();
                            }, 2000);
                        }, 2000);
                    }
                }
            })
        }

    })
})