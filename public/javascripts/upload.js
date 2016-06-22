(function($){
    var uploader = new qq.FineUploader({
        element: document.getElementById('fine-uploader'),
        autoUpload: true,
        multiple: false,
        request: {
            endpoint: '/upload',
            method: 'POST'
        },
        deleteFile: {
            enabled: true,
            endpoint: '<%=request.getContextPath()%>/manage/Bulletin?op=del',
            method: 'POST',
            forceConfirm: true,
            confirmMessage: '确定要删除文件 {filename} 吗？ 不可恢复！！',
            deletingFailedText: '删除失败！'
        },
        editFilename: {
            enabled: false
        },
        callbacks: {
            onComplete:  function(id, fileName, responseJSON)  {
                $("#url").val(responseJSON.url);
            }
        }
    });

    $("#upload").click(function(){
        $("#uploadModal").modal();
    });

    $("#download").click(function(){
        $.ajax({
            url: '/download',
            data: {
                url: $(this).attr("url")
            },
            type: 'POST',
            success: function(data) {
            }
        });
    });

})(jQuery);