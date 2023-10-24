window.onload = init;

$(document).ready(function () {

    load_data();

    function load_data() {
        $.ajax({
            url: "http://localhost:3000/rhnode",
            method: "POST",
            data: { action: 'fetch' },
            dataType: "JSON",
            success: function (data) {
                var html = '';

                if (data.data.length > 0) {
                    for (var count = 0; count < data.data.length; count++) {
                        html += `
                    <tr>
                        <td>`+ data.data[count].id + `</td>
                        <td>`+ data.data[count].name + `</td>
                        <td>`+ data.data[count].last_name + `</td>
                        <td>`+ data.data[count].phone + `</td>
                        <td>`+ data.data[count].email + `</td>
                        <td>`+ data.data[count].address + `</td>
                        <td></td>
                    </tr>
                    `;
                    }
                }

                $('#sample_data tbody').html(html);
            }
        });
    }

});