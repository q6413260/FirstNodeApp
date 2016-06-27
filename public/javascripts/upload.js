(function ($) {
    var resource = {
        showAllUploadData: function (param) {
            $.get("/getUploadDatas", param, function (data) {
                initTable(data);
            });
        }
    };
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
            onComplete: function (id, fileName, responseJSON) {
                $("#url").val(responseJSON.url);
            }
        }
    });

    $("#upload").click(function () {
        $("#uploadModal").modal();
    });

    function initTable(data) {
        var table = $("#dataTable").dataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "destory": true,
            "scrollX": true,
            "aoColumnDefs": [
                {
                    sDefaultContent: '',
                    aTargets: ['_all']
                }
            ],
            "aoColumns": [
                {"data": "author", "title": "上传者", "width": "15%"},
                {"data": "bookName", "title": "书名", "width": "15%"},
                {"data": "remark", "title": "点评", "width": "40%"},
                {
                    "data": "createdAt", "title": "上传时间", "width": "15%",
                    "fnCreatedCell": function(nTd, sData, oData, iRow, iCol){
                        var createdAtStr = formatDate(new Date(sData));
                        $(nTd).html(createdAtStr);
                    }
                },
                {
                    "data": "url", "title": "下载", "width": "15%",
                    "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                        $(nTd).html("<a href='/download?url=" + sData + "'>下载</a>");
                    }
                }
            ],
            "data": data
        });
    };

    function formatDate(date){
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + second;
    };
    resource.showAllUploadData();
})(jQuery);