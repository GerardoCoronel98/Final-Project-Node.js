window.onload = init;
var headers = {}
var url = "http://localhost:3000"

function init(event) {
    event.stopPropagation();
    token = localStorage.getItem("token")
    headers = {
        headers: {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
    }
    getEmployees();
}

function getEmployees() {
    axios.get(url + "/rhnode", headers)
        .then(function (res) {
            console.log(res)
            displayEmployees(res.data.data)
        }).catch(function (err) {
            console.log(err)
        })
}

function displayEmployees(employees) {
    var table = document.getElementById("employees-table");

    while (table.rows.length > 1) {
        table.deleteRow(1);
    } for (var i = 0; i < employees.length; i++) {
        var row = table.insertRow(i + 1);
        var propertyOrder = ['id', 'name', 'last_name', 'phone', 'email', 'address'];

        for (var j = 0; j < propertyOrder.length; j++) {
            var cell = row.insertCell(j);
            cell.innerHTML = employees[i][propertyOrder[j]];
            cell.className = 'table-cell';
        }
    }
}

//Logout botton
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
