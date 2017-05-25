jQuery(function ($) {
    var status = $("#Status").val();
    var merchantName = $("#MerchantName").val();
    var phoneNumber = $("#PhoneNumber").val();
    var loadTable = $('#MerchantInfoTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[0, "desc"]],
        "ajax": {
            "url": url_loadPage,
            "data": function (d) {
                //添加额外的参数传给服务器
                d.extra_search = { "MerchantName": merchantName, "Status": status, "PhoneNumber": phoneNumber };
            }
        },
        "aoColumns":
        [
            { "mData": "MerchantName", 'sClass': 'left' },
            {
                "mData": "PhoneNumber",
                "sWidth": "200px", 'sClass': 'left'
            },
            { "mData": "Address", 'sClass': 'left' },
            { "mData": "OpenTime", 'sClass': 'left' },
            {
                "mData": "Status",
                'sClass': 'left',
                "orderable": false,
                "mRender": function (data, type, full) {
                    if (data == -1) {
                        return '<span class="label label-sm label-default">已删除</span>';
                    }
                    else if (data == 0) {
                        return '<span class="label label-sm label-danger">已禁用</span>';
                    }
                    else if (data == 1) {
                        return '<span class="label label-sm label-success">正常</span>';
                    } else {
                        return "";
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
                    render += '<a class="blue edit" data-id="' + full.Id + '" href="' + url_editMerchant + '?id=' + full.Id + '" title="管理员"><i class="icon-user bigger-130"></i></a>';

                    if (canEditMerchant)
                        render += '<a class="blue edit" data-id="' + full.Id + '" href="' + url_editMerchant + '?id=' + full.Id + '" title="编辑"><i class="icon-pencil bigger-130"></i></a>';
                    if (canDeleteMerchant)
                        render += '<a class="red delete" data-id="' + full.Id + '" href="#" title="删除"><i class="icon-trash bigger-130"></i></a>';
                    render += '<a class="blue edit" data-id="' + full.Id + '" href="' + url_salesPersonList + '?id=' + full.Id + '" title="营业员列表"><i class="icon-group bigger-130"></i></a>';
                    if (canEditCarousel) {
                        var url = url_addCarousel.replace('%5BsourceId%5D', full.Id).replace('%5BsourceTitle%5D', full.MerchantName.substring(0, 10)).replace('%5BviewUrl%5D', "");
                        render += '<a class="blue" data-id="' + full.Id + '" href="' + url + '" title="加入轮播"><i class="icon-magic bigger-130"></i></a>';
                    }

                    render += '</div>';
                    return render;
                }
            }
        ]
    });

    //查询
    $('#QueryButton').on("click", function () {
        merchantName = $("#MerchantName").val();
        phoneNumber = $("#PhoneNumber").val();
        status = $("#Status").val();
        loadTable.api().ajax.reload();
    });

    $('#MerchantInfoTable').on("click", ".view", function (e) {
        var id = $(this).data("id");
    });

    $('#MerchantInfoTable').on("click", ".delete", function (e) {
        var id = $(this).data("id");

        bntToolkit.confirm("商家删除后，商家的优惠信息也将删除，确定还要删除吗？", function () {
            bntToolkit.post(url_deleteMerchant, { id: id }, function (result) {
                if (result.Success) {
                    $("#MerchantInfoTable").dataTable().fnDraw();
                } else {
                    bntToolkit.error(result.ErrorMessage);
                }
            });
        });
    });

    if ($("#MerchantInfoTable tbody tr").length >= 3) {
        $(".publish").attr("href", "javascript:void(0);");
        $(".publish").click(function () {
            bntToolkit.alert("每个商家最多只能发布3条优惠信息");
        });
    } else {
        $(".publish").attr("href", url_createMerchant + "");
    }
});