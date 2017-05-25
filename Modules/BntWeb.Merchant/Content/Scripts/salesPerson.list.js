jQuery(function ($) {
    var status = $("#Status").val();
    var realName = $("#RealName").val();
    var phoneNumber = $("#PhoneNumber").val();


    var loadTable = $('#MerchantInfoTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[0, "desc"]],
        "ajax": {
            "url": url_loadPage,
            "data": function (d) {
                //添加额外的参数传给服务器
                d.extra_search = { "RealName": realName, "Status": status, "PhoneNumber": phoneNumber,"MerchantId":id };
            }
        },
        "aoColumns":
        [
            { "mData": "NickName", 'sClass': 'left' },
            {
                "mData": "PhoneNumber",
                "sWidth": "200px", 'sClass': 'left'
            },
            { "mData": "IDCard", 'sClass': 'left' },
            {
                "mData": "Sex", 'sClass': 'left',
                "mRender": function (data, type, full) {
                    if (data==1) {
                        return '<span class="label label-sm label-warning">男</span>';
                    }
                    else if (data == 2) {
                        return '<span class="label label-sm label-default">女</span>';
                    } else {
                        return '<span class="label label-sm label-default">未知</span>';
                    }
                }
            },
            {
                "mData": "CreateTime", 'sClass': 'left',
                "sWidth": "200px",
                "mRender": function (data, type, full) {
                    if (data != null && data.length > 0) {
                        return eval('new ' + data.replace(/\//g, '')).Format("yyyy-MM-dd hh:mm:ss");
                    }
                    return "";
                }
            },
            {
                "mData": "Id",
                'sClass': 'center',
                "orderable": false,
                "sWidth": "200px",
                "mRender": function (data, type, full) {
                    var render = '<div class="visible-md visible-lg hidden-sm hidden-xs action-buttons">';
                    
                    render += '<a class="blue edit" data-id="' + full.Id + '" href="' + url_editSalesPerson + '?id=' + full.Id + '&merchantId=' + id + '" title="编辑"><i class="icon-pencil bigger-130"></i></a>';
                        render += '<a class="red delete" data-id="' + full.Id + '" href="#" title="删除"><i class="icon-trash bigger-130"></i></a>';
                   
                    render += '</div>';
                    return render;
                }
            }
        ]
    });

    //查询
    $('#QueryButton').on("click", function () {
        merchantName = $("#RealName").val();
        phoneNumber = $("#PhoneNumber").val();
        status = $("#Status").val();
        loadTable.api().ajax.reload();
    });

    $('#MerchantInfoTable').on("click", ".view", function (e) {
        var id = $(this).data("id");
    });

    $('#MerchantInfoTable').on("click", ".delete", function (e) {
        var id = $(this).data("id");

        bntToolkit.confirm("确定要删除该营业员吗？", function () {
            bntToolkit.post(url_deleteSalesPerson, { id: id }, function (result) {
                if (result.Success) {
                    $("#MerchantInfoTable").dataTable().fnDraw();
                } else {
                    bntToolkit.error(result.ErrorMessage);
                }
            });
        });
    });

});