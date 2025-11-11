function FillStandardList(ddlId, selectedId) {
    $.ajax({
        url: '/Batch/GetData',
        contentType: "application/json; charset=utf-8",
        type: "GET",
        data: JSON.stringify({
            cls: cls
        }),
        success: function (data) {
            if (data != null) {
                if (data.LSTDataList.length > 0) {
                    var item = data.LSTDataList;
                    for (var i = 0; i < item.length; i++) {

                        var chked = '';
                        if (selectedId != 0 && item[i].intId == selectedId)
                            chked = 'checked';


                        trList = trList + "<tr ondblclick='openEditPopup(" + item[i].intId + ")'>";
                        trList = trList + "<td><input attrId='" + item[i].intId + "' id='" + item[i].intId + "' name='gridlist' type='checkbox' " + chked + " onchange='checkedItem(this, \"\", \"cls-chk-item\", \"chk-Header\")' class='cls-chk-item' /></td>";
                        trList = trList + '<td>' + (i + 1) + '</td>';
                        trList = trList + '<td>' + item[i].strName + '</td>';
                        var text = '';
                        if (item[i].bIsActive == 0) {
                            trList = trList + '<td><span class="label label-lightred">InActive</span></td>';
                            text = 'Active';
                        }
                        else {
                            trList = trList + '<td><span class="label label-satgreen">Active</span></td>';
                            text = 'InActive';
                        }
                        trList = trList + '<td> <input type="button" class="wbtn wnew" onclick="openUpdateConfirmationPopup(' + item[i].intId + ')" value="' + text + '" id="btnAddNew"></td>';
                        //trList = trList + '<td> <a href="' + siteURL + 'Virtual/VSaleView?orderId=' + data[i].OrderId + '" Target="_blank" class=\"btn btn-primary btn-sm\">View</a></td>';
                        //trList = trList + '<td> <a href="' + siteURL + 'Actual/ASaleBillList?orderId=' + item[i].OrderId + '&orderNo=' + item[i].OrderNo + '&UserId=' + data[i].Id + '" Target="_blank" class=\"btn btn-primary btn-sm\">Bills</a></td>';
                        trList = trList + '</tr>';
                    }

                    $('#tblBody').append(trList);
                }
            }
        },
        error: function (xhr) {
            console.log(xhr);
        }
    });
}

function GetBoardMediumStandardData(bIsGetBoard, bIsGetMedium, bIsGetStandard) {
    var cls = {
        intId: intId,
        bIsGetBoard: bIsGetBoard,
        bIsGetMedium: bIsGetMedium,
        bIsGetStandard: bIsGetStandard
    }

    $.ajax({
        url: '/Common/FillBoardMediumStandard',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify({
            cls: cls
        }),
        success: function (data) {
            if (data != null) {
                if (bIsGetBoard == true)
                    GenerateDDLHTML('board', data.BoardList, 0, 'intBoardId');
                if (bIsGetMedium == true)
                    GenerateDDLHTML('medium', data.MediumList, 0, 'intMediumId');
                if (bIsGetStandard == true)
                    GenerateDDLHTML('standard', data.StandardList, 0, 'intStandardId');

                //document.getElementById('strName').value = data.strName;
            }
        },
        error: function (xhr) {
            console.log(xhr);
            $('.loading-modal').hide();
        }
    });
}

function GenerateDDLHTML(type, obj, selectedId, id) {
    var strHTML = ''

    strHTML = strHTML + '<option value="0">--select ' + type + '--</otpion>'

    if (obj != null && obj.length > 0) {
        for (var i = 0; i < obj.length; i++) {
            if (obj.length == 1 || obj[i].intId == selectedId)
                strHTML = strHTML + '<option value=' + obj[i].intId + ' selected>' + obj[i].strName + '</otpion>'
            else
                strHTML = strHTML + '<option value=' + obj[i].intId + '>' + obj[i].strName + '</otpion>'
        }
    }

    $('#' + id).empty();
    $('#' + id).append(strHTML);
}

function GetMappedBoardMediumStandardData(bIsGetBoard, bIsGetMedium, bIsGetStandard) {
    var cls = {
        intId: intId,
        bIsGetBoard: bIsGetBoard,
        bIsGetMedium: bIsGetMedium,
        bIsGetStandard: bIsGetStandard
    }

    $('.loading-modal').show();
    $.ajax({
        url: '/Common/GetBoardMediumStandardList',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify({
            cls: cls
        }),
        success: function (data) {
            if (data != null) {
                if (bIsGetBoard == true)
                    GenerateDDLHTML('board', data.BoardList, 0, 'intBoardId');
                if (bIsGetMedium == true)
                    GenerateDDLHTML('medium', data.MediumList, 0, 'intMediumId');
                if (bIsGetStandard == true)
                    GenerateDDLHTML('standard', data.StandardList, 0, 'intStandardId');

                GenerateDDLHTML('shift', data.ShiftList, 0, 'intShiftId');

                //document.getElementById('strName').value = data.strName;
            }
            $('.loading-modal').hide();
        },
        error: function (xhr) {
            console.log(xhr);
            $('.loading-modal').hide();
        }
    });
}

function GetBatchStandardWise(intStandardId) {
    var cls = {
        intStandardId: intStandardId
    }
   
    if (intStandardId == 0)
    {
        var data = null;
        GenerateDDLHTML('batch', data, 0, 'intBatchId');
        return;
    }


    $('.loading-modal').show();
    $.ajax({
        url: '/Common/GetBatchStandardWise',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify({
            cls: cls
        }),
        success: function (data) {
            if (data != null) {
                GenerateDDLHTML('batch', data.DataList, 0, 'intBatchId');
            }
            $('.loading-modal').hide();
        },
        error: function (xhr) {
            console.log(xhr);
            $('.loading-modal').hide();
        }
    });
}

function GetCountryStatesCity(bIsGetCountry, bIsGetStates, bIsCity) {
    var cls = {
        intId: intId,
        bIsGetCountry: bIsGetCountry,
        bIsGetStates: bIsGetStates,
        bIsCity: bIsCity
    }

    $.ajax({
        url: '/Common/FillCountryStatesCity',
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: JSON.stringify({
            cls: cls
        }),
        success: function (data) {
            debugger;
            if (data != null) {
                if (bIsGetCountry == true)
                    GenerateDDLHTML('Country', data.CountryList, 0, 'intCountryId');
                if (bIsGetStates == true)
                    GenerateDDLHTML('States', data.StateList, 0, 'intStatesId');
                if (bIsCity == true)
                    GenerateDDLHTML('City', data.CityList, 0, 'intCityId');

                //document.getElementById('strName').value = data.strName;
            }
        },
        error: function (xhr) {
            console.log(xhr);
            $('.loading-modal').hide();
        }
    });
}