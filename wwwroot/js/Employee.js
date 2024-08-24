$(document).ready(function () {

    //We initially charge employees.
    loadEmployees();

    //We validate and send form when submit.
    $('#employeeForm').submit(function (event) {

        event.preventDefault();

        //We validate text from add button at first, in order if its an adding or a updating.
        if ($('#addEmployee').text() == 'Update Employee') {

            let employee = {
                Id: $('#employeeId').val(),
                Name: $('#employeeName').val(),
                Position: $('#employeePosition').val(),
                Office: $('#employeeOffice').val(),
                Salary: $('#employeeSalary').val()
            }

            console.log(employee);

            updateEmployee(employee);
        } else {

            addEmployee();
        }      
    });

    //Update employee when click.
    $('#employeeTable').on('click', '.update-employee', function () {

        var employeeId = $(this).data('id');

        getEmployeeById(employeeId);
        
    });

    //Delete employee when click.
    $('#employeeTable').on('click', '.delete-employee', function () {

        if (confirm('Are you sure you want to delete this employee?')) {

            var employeeId = $(this).data('id');
            deleteEmployee(employeeId);
        }
        
    });

});

function addEmployee() {

    //Simple AJAX validation.
    if ($('#employeeName').val() && $('#employeePosition').val() && $('#employeeOffice').val() && $('#employeeSalary').val()) {

        //Simple AJAX name validation.
        if ($('#employeeName').val().length > 3) {

            var employee = {
                Name: $('#employeeName').val(),
                Position: $('#employeePosition').val(),
                Office: $('#employeeOffice').val(),
                Salary: $('#employeeSalary').val()
            };

            $.ajax({
                type: 'POST',
                url: '/Employee/AddEmployee',
                data: employee,
                success: function () {

                    //We load employees to see the new one.
                    loadEmployees();

                    //We reset the form.
                    document.getElementById("employeeForm").reset();
                }
            });

        } else {
            alert("Name is minimun of 4 characters.")
        }

    } else {
        alert("Empty fields.")
    }
}

function loadEmployees() {

    //We get employees or/and add employees creating the html part.
    $.ajax({
        type: 'GET',
        url: '/Employee/GetEmployees',
        success: function (data) {

            var rows = '';
            data.forEach(function (employee) {
                rows += `<tr>
                            <td>${employee.name}</td>
                            <td>${employee.position}</td>
                            <td>${employee.office}</td>
                            <td>${employee.salary}</td>
                            <td>
                                <button class="btn btn-primary update-employee" data-id="${employee.id}">Update</button>
                                <button class="btn btn-danger delete-employee" data-id="${employee.id}">Delete</button>
                            </td>
                         </tr>`;
            });
            $('#employeeTable').html(rows);
        },

        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function getEmployeeById(employeeId) {

    $.ajax({
        url: '/Employee/GetEmployeeById',
        type: 'GET',
        data: { employeeId: employeeId },
        success: function (response) {

            //We re-fill form with user data.
            $('#employeeId').val(response.id);
            $('#employeeName').val(response.name);
            $('#employeePosition').val(response.position);
            $('#employeeOffice').val(response.office);
            $('#employeeSalary').val(response.salary);

            //We change submit button text for updating.
            $('#addEmployee').text('Update Employee');
        }
    });
}

function updateEmployee(employee) {

    $.ajax({
        type: "PUT",
        url: '/Employee/UpdateEmployee',
        data: { employee: employee },
        success: function (data) {
            let x = JSON.stringify(data);
            console.log(x);

            //We load employees to see the updated.
            loadEmployees();

            //We reset the form.
            document.getElementById("employeeForm").reset();

            //We change submit button text for adding.
            $('#addEmployee').text('Add Employee');
        },

        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}

function deleteEmployee(employeeId) {

    $.ajax({
        type: "DELETE",
        url: '/Employee/DeleteEmployee',
        data: { employeeId: employeeId },
        success: function (data) {
            let x = JSON.stringify(data);
            console.log(x);

            //We load employees to see the deleted one.
            loadEmployees();
        },

        error: function (error) {
            console.log(`Error ${error}`);
        }
    });
}
