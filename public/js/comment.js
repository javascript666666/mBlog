//评论每页显示的数目
var perpage = 5;
var page = 1;
var pages = 0;
var comments = [];
//提交评论
$('#messageBtn').on('click', function() {
    $.ajax({
        type: 'POST',
        url: '/api/comment/post',
        data: {
            contentid: $('#contentId').val(),
            content: $('#messageContent').val()
        },
        success: function(responseData){
            $('#messageContent').val('');
           // console.log(responseData.data.comments);
            comments = responseData.data.comments.reverse();
            renderComment();
        }
    })
});

//每次页面重载的时候获取一下该文章的所有评论
$.ajax({
    url: '/api/comment',
    data: {
        contentid: $('#contentId').val( )
    },
    success: function(responseData){
        comments = responseData.data.reverse();
        renderComment();
    }
})

$('.pager').delegate('a','click',function() {
    if($(this).parent().hasClass('previous')){
        page--;
    } else {
        page++;
    }
    renderComment();
})

function renderComment(){
    $('#messageCount').html(comments.length);

    pages = Math.max(Math.ceil(comments.length/perpage), 1);
    var start = Math.max(0,(page-1)*perpage);
    var end = Math.min(page*perpage,comments.length);
    var $lis = $('.pager li');
    //评论数分页显示
    $lis.eq(1).html(page+'/'+pages);

    if (page <= 1){
        page = 1;
        $lis.eq(0).html('<span>没有上一页了</span>');
    } else {
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if (page >= pages){
        page = pages;
        $lis.eq(2).html('<span>没有下一页了</span>');
    } else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }

    if(comments.length == 0) {
        $('.messageList').html('<div class="messageBox"><p>还没有评论</p></div>');
    } else {
        var html = '';
        for (var i=start; i<end; i++){
            html += '<div class="messageList" style="display: block;"> <div class="messageBox"> <p class="name clear"><span class="fl">' + comments[i].username + '</span><span class="fr">'+formatDate(comments[i].postTime)+'</span></p><p>'+comments[i].content+'</p> </div></div>'
        }
        $('.messageList').html(html);
    }
}

//格式化时间
function formatDate(d) {
    //console.log(d);
    var date1 = new Date(d);
    return date1.getFullYear() +'年'+ (date1.getMonth()+1) +'月'+date1.getDate()+'日 '+ date1.getHours()+':'+date1.getMinutes()+':'+date1.getSeconds();
}