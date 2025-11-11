

function clearMessageDiv() {
    $('#messageDiv').empty();
}
function clearPopupMessageDiv(popupid) {
    $('#' + popupid).empty();
}
function generateMessageDiv(type, message) {
    $('#messageDiv').empty();
    var className = type;
    if (type == 'error') {
        className = "danger";
    }

    var messageStr = '';
    messageStr += '<div class="col-md-12">'
    messageStr += '<div class="alert alert-' + className + '" style="margin-top: 10px;">'
    messageStr += '<strong style="text-transform: capitalize;">' + type + ' ! </strong>';
    messageStr += '<span>' + message + ' </span>'
    messageStr += '</div>'
    messageStr += '</div>'

    $('#messageDiv').append(messageStr);

}
function ConvertRazorToDate(date) {
    if (date != null) {
        var value = new Date(parseInt(date.substr(6)));
        var d = value.getDate();
        var m = value.getMonth() + 1;
        var y = value.getFullYear();

        return d + '/' + m + '/' + y;
    }
    else {
        return '';
    }
}
function generatePopupMessageDiv(popupid, type, message) {
    $('#' + popupid).empty();
    var className = type;
    if (type == 'error') {
        className = "danger";
    }

    var messageStr = '';
    messageStr += '<div class="col-md-12">'
    messageStr += '<div class="alert alert-' + className + '" style="margin-top: 10px;">'
    messageStr += '<strong style="text-transform: capitalize;">' + type + ' ! </strong>';
    messageStr += '<span>' + message + ' </span>'
    messageStr += '</div>'
    messageStr += '</div>'

    $('#' + popupid).append(messageStr);

}

var globalCheckBoxCount = 0;

function clearCheckBoxSelection(itemclassName, headerId) {
    globalCheckBoxCount = 0;
    var data = document.getElementsByClassName('' + itemclassName + '');
    for (var i = 0; i < data.length; i++) {
        data[i].checked = false;


    }
    var header = document.getElementById('' + headerId + '');
    if (header != null)
        header.checked = false;
    showHideButton();
}

function checkedHeader(obj, type, itemclassName, id) {
    clearMessageDiv();
    var data = document.getElementsByClassName('' + itemclassName + '');
    if (obj.checked == true) {
        for (var i = 0; i < data.length; i++) {
            data[i].checked = true;
            globalCheckBoxCount++;
            document.getElementById('btnDeleteAll').style.display = 'block';
        }
    }
    else {
        for (var i = 0; i < data.length; i++) {
            data[i].checked = false;
            globalCheckBoxCount = 0
            document.getElementById('btnDeleteAll').style.display = 'none';
        }
    }
    showHideButton();
}

function checkedItem(obj, type, itemclass, headerId) {
    clearMessageDiv();

    var header = document.getElementById('' + headerId + '');
    var data = document.getElementsByClassName('' + itemclass + '');
    var flag = true;
    var btnshowhide = false;
    for (var i = 0; i < data.length; i++) {
        if (data[i].checked == false) {
            flag = false;
        }
        if (data[i].checked == true) {
            btnshowhide = true;
        }


    }


    if (btnshowhide == true) {
        document.getElementById('btnDeleteAll').style.display = 'block';
    }
    else {
        document.getElementById('btnDeleteAll').style.display = 'none';
    }

    if (obj.checked == true) {
        globalCheckBoxCount++;
        //document.getElementById('btnDeleteAll').style.display = 'block';
    }
    else {
        globalCheckBoxCount > 0 ? globalCheckBoxCount-- : 0;

    }



    if (header != null)
        header.checked = flag;

    showHideButton();
}

function showHideButton() {
    if (globalCheckBoxCount == 0) {
        document.getElementById('btnAddNew') != null ? document.getElementById('btnAddNew').style.display = 'inline' : document.getElementById('btnAddNew');
        document.getElementById('btnEdit') != null ? document.getElementById('btnEdit').style.display = 'none' : document.getElementById('btnEdit');
        document.getElementById('btnDelete') != null ? document.getElementById('btnDelete').style.display = 'none' : document.getElementById('btnDelete');
    }
    else if (globalCheckBoxCount == 1) {
        document.getElementById('btnAddNew') != null ? document.getElementById('btnAddNew').style.display = 'inline' : document.getElementById('btnAddNew');
        document.getElementById('btnEdit') != null ? document.getElementById('btnEdit').style.display = 'inline' : document.getElementById('btnEdit');
        document.getElementById('btnDelete') != null ? document.getElementById('btnDelete').style.display = 'inline' : document.getElementById('btnDelete');
    }
    else {
        document.getElementById('btnAddNew') != null ? document.getElementById('btnAddNew').style.display = 'inline' : document.getElementById('btnAddNew');
        document.getElementById('btnDelete') != null ? document.getElementById('btnDelete').style.display = 'inline' : document.getElementById('btnDelete');
        document.getElementById('btnEdit') != null ? document.getElementById('btnEdit').style.display = 'none' : document.getElementById('btnEdit');
    }
}

function GenerateDDLHTML(obj, divId, text, selecteId) {
    var strHTML = '';
    $('#' + divId).empty();
    strHTML = strHTML + ' <option value="0">--' + text + '--</option>';
    for (var i = 0; i < obj.length; i++) {
        if (obj[i].intId == selecteId) {
            strHTML = strHTML + ' <option value="' + obj[i].intId + '" selected>' + obj[i].strName + '</option>';
        }
        else {
            strHTML = strHTML + ' <option value="' + obj[i].intId + '">' + obj[i].strName + '</option>';
        }
    }
    $('#' + divId).append(strHTML);
}
function validateEmail(strEmail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(strEmail)) {
        return true;
    }
    else {
        return false;
    }
}
