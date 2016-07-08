window.onload = function Pageinit() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (event) {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                console.log(xhr.responseText);
                var obj = eval(xhr.responseText);
                for (var i = 0; i < 3; i++) {
                    var id = '#' + i + '';
                    $('#' + (i + 1) + '').css("top", $(".messageBar").height() * (i + 0.5) * 1.15 + "px");
                    $(id + " .content marquee").html(obj[i].content);
                    $(id + " .userInfo .nickname").html(obj[i].nickname);
                    $(id + " .userInfo .headimg").attr("src", obj[i].headimgurl);
                }
                $("#0").css("top", -$(".messageBar").height() * 1.2 + "px");
                //$("#3").css("top", $("body").height() * 1.2 + "px");

                $('#' + 0 + '')[0].style.transform = "translateY(" + ($(".messageBar").height() * 0.5 * 1.15 + $(".messageBar").height() * 1.2) + "px)";
                $('#' + 0 + '')[0].style.transition = "transform 0ms";
                $('#' + 1 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
                $('#' + 1 + '')[0].style.transition = "transform 0ms";
                $('#' + 2 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
                $('#' + 2 + '')[0].style.transition = "transform 0ms";
                $('#' + 3 + '')[0].style.transform = "translateY(" + ($("body").height() * 1.2 - $(".messageBar").height() * 2.5 * 1.15) + "px)";
                $('#' + 3 + '')[0].style.transition = "transform 0ms";
            } else {
                salert("Request was unsuccessful: " + xhr.status);
            }
        }
    };
    xhr.open("GET", "https://wall.cgcgbcbc.com/api/messages?num=3", true);
    xhr.send(null);
}

var isAdminBeing = false;
var clock;

function messageUpdate(data) {
    if (!isAdminBeing) {
        for (var i = 3; i > 0; i--) {
            $('#' + i + '')[0].style.transform = "";
            $('#' + i + '')[0].style.transition = "transform 0ms";
            $('#' + i + " .content marquee").html($('#' + (i - 1) + " .content marquee").html());
            $('#' + i + " .userInfo .nickname").html($('#' + (i - 1) + " .userInfo .nickname").html());
            $('#' + i + " .userInfo .headimg").attr("src", $('#' + (i - 1) + " .userInfo .headimg").attr("src"));
        }
        $('#' + 0 + '')[0].style.transform = "";
        $('#' + 0 + '')[0].style.transition = "transform 0ms";
        $('#' + 0 + " .content marquee").html(data.content);
        $('#' + 0 + " .userInfo .nickname").html(data.nickname);
        $('#' + 0 + " .userInfo .headimg").attr("src", data.headimgurl);

        //动画
        $('#' + 0 + '')[0].style.transform = "translateY(" + ($(".messageBar").height() * 0.5 * 1.15 + $(".messageBar").height() * 1.2) + "px)";
        $('#' + 0 + '')[0].style.transition = "transform 300ms";
        $('#' + 1 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
        $('#' + 1 + '')[0].style.transition = "transform 300ms";
        $('#' + 2 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
        $('#' + 2 + '')[0].style.transition = "transform 300ms";
        $('#' + 3 + '')[0].style.transform = "translateY(" + ($("body").height() * 1.2 - $(".messageBar").height() * 2.5 * 1.15) + "px)";
        $('#' + 3 + '')[0].style.transition = "transform 300ms";
    } else {
        for (var i = 3; i > 1; i--) {
            $('#' + i + '')[0].style.transform = "";
            $('#' + i + '')[0].style.transition = "transform 0ms";
            $('#' + i + " .content marquee").html($('#' + (i - 1) + " .content marquee").html());
            $('#' + i + " .userInfo .nickname").html($('#' + (i - 1) + " .userInfo .nickname").html());
            $('#' + i + " .userInfo .headimg").attr("src", $('#' + (i - 1) + " .userInfo .headimg").attr("src"));
        }
        $('#' + 1 + '')[0].style.transform = "";
        $('#' + 1 + '')[0].style.transition = "transform 0ms";
        $('#' + 1 + " .content marquee").html(data.content);
        $('#' + 1 + " .userInfo .nickname").html(data.nickname);
        $('#' + 1 + " .userInfo .headimg").attr("src", data.headimgurl);

        //动画
        $('#' + 1 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
        $('#' + 1 + '')[0].style.transition = "transform 300ms";
        $('#' + 2 + '')[0].style.transform = "translateY(" + $(".messageBar").height() * 1.15 + "px)";
        $('#' + 2 + '')[0].style.transition = "transform 300ms";
        $('#' + 3 + '')[0].style.transform = "translateY(" + ($("body").height() * 1.2 - $(".messageBar").height() * 2.5 * 1.15) + "px)";
        $('#' + 3 + '')[0].style.transition = "transform 300ms";
    }

}
var socket = io.connect('https://wall.cgcgbcbc.com');
socket.on('new message', messageUpdate);

socket.on('admin', function (data) {
    if (!isAdminBeing) {
        data.headimgurl = "admin.jpg";
        messageUpdate(data);
        isAdminBeing = true;
        $('#' + 0 + '').css("border", "5px solid red");
        $('#' + 0 + '').css("color", "#f84040");
        clock = setTimeout(function () {
            isAdminBeing = false;
            $('#' + 0 + '').css("border", "");
            $('#' + 0 + '').css("color", "");
        }, 10000);
    } else {
        $('#' + 0 + " .content marquee").html(data.content);
        $('#' + 0 + " .userInfo .nickname").html(data.nickname);
        clearTimeout(clock);
        clock = setTimeout(function () {
            isAdminBeing = false;
            $('#' + 0 + '').css("border", "");
            $('#' + 0 + '').css("color", "");
        }, 10000);
    }
});