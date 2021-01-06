function sendNewStudent() {
    let id = $('input[name=student-id]').val();
    let name = $('input[name=student-name]').val();
    let sex = $('input[name=sex]:checked').val();
    let age = $('input[name=student-age]').val();
    let idTipEl = $('#id-tip');

    let newStudent = {
        id: id,
        name: name,
        sex: sex,
        age: age
    }

    fetch('/api/student', {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data.result);
            if (data.result === 1) {
                alert('Student has been added');
                $('input[type=text]').val('');
            }
            else if (data.result === -1) {
                (alert('ID has been used!'))
            }
            else alert('Server not response!!')
        })
}


$('#btn').click(function () {
    console.log('Clicked');
    sendNewStudent();
});

$('input[name=student-id]').blur(function () {
    const studentId = parseInt($('input[name=student-id]').val());
    if (isNaN(studentId) || !studentId || !(studentId >= 100000 && studentId <= 999999)) {
        $('#id-tip').removeClass('alert-success').addClass('alert-danger').html('Please input correct ID value(6 numbers)').show();
        return;
    }

    $.ajax({
        type: 'propfind',
        url: '/' + $('input[name=student-id]').val(),
        success: function (result) {
            console.log(result);
            if (!result.result) {
                $('#id-tip').removeClass('alert-success').addClass('alert-danger').html('The ID has been used, please choose another one!!').show();
                return;
            } else {
                $('#id-tip').removeClass('alert-danger').addClass('alert-success').html('ID can be used').show();
            }
        }
    })
})

$('input[name=student-id]').focus(function () {
    $('#id-tip').hide();
})