function sendNewStudent() {
    let id = $('input[name=student-id]').val();
    let name = $('input[name=student-name]').val();
    let sex = $('input[name=sex]:checked').val();
    let age = $('input[name=student-age]').val();
    let idTipEl = $('#id-tip');

    let newStudent = {
        name: name,
        sex: sex,
        age: age
    }

    fetch('/api/student/' + id, {
        method: 'POST',
        body: JSON.stringify(newStudent),
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.errors) {
                error
            }
        })
}
$('#btn').click(function () {
    console.log('Clicked');
    sendNewStudent();
})