 $(function () {
     $('.title span').on('click', function () {
         window.location.href = './index.html'
     });
     var storage = window.localStorage; //定义localStorage
     var niankuan = storage.getItem('niankuan') || '';
     niankuan = parseInt(niankuan);
     //consle.log(niankuan);
     var myDate = new Date();
     var year = myDate.getFullYear(); //当前年份
     var Month = myDate.getMonth() + 1; //当前月份
     var deta_html = '';
     var m_html = '';
     for (var i = niankuan; i <= year; i++) {
         deta_html += `<div class="deta_year" data-niankuan=${i}>${i}</div>
         `;
         if (i == year) {
             for (var j = 1; j <= Month; j++) {
                 deta_html += `
                <div class="deta_month_son ${i}" style="display:none" data-yid=${i} data-mid=${j}>${j}月</div>
            
            `
             }
         } else {
             for (var j = 1; j <= 12; j++) {
                 deta_html += `
                <div class="deta_month_son ${i}" style="display:none" data-yid=${i} data-mid=${j}>${j}月</div>`
             }
         }
     }
     $('.deta').append(deta_html);

     var deta_str = ''; //定义选中时间字符串
     //点击年份 上拉下卷
     $('.deta').on('click', '.deta_year', function (e) {
         var niankuan = e.currentTarget.dataset.niankuan;
         deta_str = niankuan;
         //consle.log(deta_str)
         $("." + niankuan).slideToggle();
     });
     // 点击月份 
     $('.deta').on('click', '.deta_month_son', function (e) {
         var yid = e.currentTarget.dataset.yid;
         var mid = e.currentTarget.dataset.mid;
         deta_str = yid + "-" + mid;
         //consle.log(deta_str);
         storage.setItem('car_deta', deta_str);
         var city_suer = storage.getItem('city_suer') || '';
         city_suer = JSON.parse(city_suer);
         //consle.log(city_suer);
         window.location.href = `./index.html?city=${city_suer.city}&stationid=${city_suer.stationid}`;
     })
 })