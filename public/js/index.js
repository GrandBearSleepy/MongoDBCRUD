//render page

function renderStudent(data) {
    $.each(data.results, function (index, value) {
        $tr = $('<tr></tr>');
        $('<td></td>').html(value.id).appendTo($tr);
        $('<td></td>').html(value.name).appendTo($tr);
        $('<td></td>').html(value.age).appendTo($tr);
        $('<td></td>').html(value.sex).appendTo($tr);
        $('<td><input type="button" class="btn btn-danger delbtn" value="delete" data-id="' + value.id + '"/>  <input type="button" class="btn btn-warning modbtn" value="modify" data-id="' + value.id + '"/></td>').appendTo($tr);

        $tr.appendTo($('tbody'));
    })
}

$.get('/student', function (data) {
    renderStudent(data)
})

$('#tbody').delegate('.delbtn', 'click', function () {
    // alert('Warning!!')
    let $id = $(this).attr('data-id');
    fetch('/api/student/' + $id, {
        method: 'DELETE',
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
            console.log(data);
            if (data.errors) {
                error;
            } else {
                alert('Delete success!!');
            }

        });
    window.location.reload();

});

$('#tbody').delegate('.modbtn', 'click', function () {
    let $id = $(this).attr('data-id');
    window.location = '/api/student/' + $id;
});
