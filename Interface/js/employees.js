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
    }

    for (var i = 0; i < employees.length; i++) {
        var row = table.insertRow(i + 1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell1.innerHTML = employees[i].id;
        cell2.innerHTML = employees[i].name;
        cell3.innerHTML = employees[i].last_name;
        cell4.innerHTML = employees[i].phone;
        cell5.innerHTML = employees[i].email;
        cell6.innerHTML = employees[i].address;
    }
}

//Logout botton
function logout() {
    localStorage.removeItem("token");
    window.location.href = "index.html";
}
