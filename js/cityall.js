$(function () {
    window.localStorage.setItem('city', '北京');
    $('.city-list li a').on('click', function () {
        $('.city-list li a').removeClass('active');
        $(this).addClass('active');
        $('.current li a').text($(this).text());
        var city = $(this).text();
        window.localStorage.setItem('city', city);
        console.log(window.localStorage.getItem('city'));
    })
    $('.city-list').on('click', 'li', function () {
        // window.location.href='index.html';
        window.history.go(-1)
    })
})
