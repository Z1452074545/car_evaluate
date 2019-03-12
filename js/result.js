$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        speed: 1000, //播放速度
        autoHeight: true,
        loop: true, //是否循环播放
        setWrapperSize: true,
        effect: 'slide', //动画效果
    });
    $('.swiper-slide').on('touchend', function (e) {
        var index = e.currentTarget.dataset.index;
        var data = [];
        console.log(index);
        switch (index) {
            case '0':
                index = 1;
                data = [
                    ['2019年', 24.3],
                    ['2020年', 24.8],
                    ['2021年', 18.9]
                ]
                break;
            case '1':
                index = 2;
                data = [
                    ['2019年', 22.3],
                    ['2020年', 20.8],
                    ['2021年', 17.9]
                ]
                break;
            case '2':
                index = 0;
                data = [
                    ['2019年', 18.3],
                    ['2020年', 16.8],
                    ['2021年', 14.9]
                ]
                break;
        }
        console.log(index);
        console.log(data);
        //Highcharts
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: '平均售价趋势',
                fontSize: '13px'
            },

            xAxis: {
                type: 'category',
                labels: {
                    rotation: 0,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                labels: {
                    enabled: false
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '爱车售价: <b>{point.y:.1f} 万元</b>'
            },
            series: [{
                name: '万元',
                data: data,
                dataLabels: {
                    enabled: true,
                    rotation: 0,
                    align: 'right',
                    style: {
                        fontSize: '13px',

                    }
                }
            }]
        });
        //隐藏 
        $('tspan:contains(Values)').hide();
        $('.highcharts-credits').hide();
        $('.navgt_item span').removeClass('navgt_item_bot_active');
        var item = $('.navgt_item')[index];
        var i_span = item.getElementsByTagName('span');

        i_span = $(i_span);
        i_span.addClass('navgt_item_bot_active');

        //触发左右滑动事件 售价区间赋值
        // $('.price_left').html("57.2万元");
        // $('.price_center').html("48.2万元");
        // $('.price_right').html("32.2万元");
        $('.price_left').html("57万元" + index);
        $('.price_center').html("48.2万元" + index);
        $('.price_right').html("32.2万元" + index);
    })
    // 初始化 售价区间赋值
    $('.price_left').html("57.2万元");
    $('.price_center').html("48.2万元");
    $('.price_right').html("32.2万元");

    //canvas 绘图
    var bg = document.getElementById('price_box');
    var ctx = bg.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 120);
    ctx.lineTo(300, 120);
    ctx.fillStyle = '#81c1fb';
    ctx.fill();

    var price_min = document.getElementById('price_min');
    var ctx = price_min.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 160);
    ctx.lineTo(320, 160);
    ctx.fillStyle = '#cfd5dc';
    ctx.fill();


    //Highcharts
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: '平均售价趋势',
            fontSize: '13px'
        },

        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            labels: {
                enabled: false
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '爱车售价: <b>{point.y:.1f} 万元</b>'
        },
        series: [{
            name: '万元',
            data: [
                ['2019年', 18.3],
                ['2020年', 16.8],
                ['2021年', 14.9]
            ],
            dataLabels: {
                enabled: true,
                rotation: 0,
                align: 'right',
                style: {
                    fontSize: '13px',

                }
            }
        }]
    });

    //隐藏 
    $('tspan:contains(Values)').hide();
    $('.highcharts-credits').hide();


    // hint 
    //user_hint:
    function user_hint(txt) {
        $('.lay_hint').empty();
        $('.lay_hint').html(txt);
        $('.lay_hint').css('display', 'block');
        setTimeout(function () {
            $('.lay_hint').css('display', 'none');
        }, 2000)
    };

    // 点击 抵押贷款
    var _this = this;
    $('.loans').on('click', function () {
        user_hint('您的抵押意向已提交,客服会尽快与您联系')

    })
    //点击 高价卖车
    $('.sell_truck').on('click', function () {
        $('.sell_truck_pop').show();
    })
    //点击 关闭弹窗
    $('.but_x').on('click', function () {
        $('.sell_truck_pop').hide();
    })
    //点击 关闭弹窗 确认
    $('.but_affirm').on('click', function () {
        $('.sell_truck_pop').hide();
    })

})