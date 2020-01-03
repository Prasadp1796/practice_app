
const app = angular.module("manageEmployeesApp", ['ngMessages', 'ui.bootstrap', 'ui.bootstrap.modal', 'smart-table']);
app.controller("manageEmployeesAppCtrlr", ["$scope", "$http", "$uibModal", function ($scope, $http, $uibModal) {

    //Method To Get Employees List
    $scope.getEmployees = function () {
        $http.get('/getEmployeesList').then(function (res) {
            console.log(res)
            if(res.status === 500)
                alertify.error("Something went wrong while getting employees list");
            else
                $scope.employeesList = res.data;
        });
    };

    //Method To Delte Employee
    $scope.deleteEmployee = function(EmployeeID){
        alertify.confirm("Delete User ?",function(){
            $http.get(`/deleteEmployee?EmployeeID=${EmployeeID}`).then(function(res){
                if(res.status === 201){
                    // $scope.close();
                    alertify.set('notifier','position', 'bottom-right');
                    alertify.success("Employee Deleted Successfully");
                    $scope.getEmployees();
                }else{
                    alertify.error("Something went wrong while deleting employee");
                }
            })
        });
    }

    //Method To Open Modal
    $scope.openModal = function (mode, data) {
        console.log(mode, data)
        let modalData = {};
        if(mode === 'edit')
            modalData = angular.copy(data)

        modalData.mode = mode;
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal.html',
            controller: 'manageEmployeeDetails',
            scope: $scope,
            backdrop: false,
            size: 'lg',
            windowClass: 'show',
            resolve: {
                record: function () {
                    return modalData;
                }
            }
        })
    };
}]);

//Controller For Managing Employees
app.controller("manageEmployeeDetails", function ($scope, record, $http) {
    //Method To Init Modal
    function init() {
        $scope.employee = record;
    }

    init();

    //Method To Create New Employee
    $scope.addEmployee = function () {
        $http.post('/createEmployee', $scope.employee).then(function (res) {
            if(res.status === 200){
                console.log(res.data)
                $scope.errorMessages = res.data.message;
            }
            else if(res.status === 201){
                alertify.set('notifier','position', 'bottom-right');
                alertify.success("Employee Added Successfully");
                $scope.close();
                $scope.getEmployees();
            }else{
                alertify.set('notifier','position', 'bottom-right');
                alertify.error("Something went wrong while adding new employee");
            }
        });
    };

    //Method To Create New Employee
    $scope.editEmployee = function () {
        $http.post('/editEmployee', $scope.employee).then(function (res) {
            if(res.status === 200){
                console.log(res.data)
                $scope.errorMessages = res.data.message;
            }
            else if(res.status === 201){
                alertify.set('notifier','position', 'bottom-right');
                alertify.success("Employee Details Updated Successfully");
                $scope.close();
                $scope.getEmployees();
            }else{
                alertify.set('notifier','position', 'bottom-right');
                alertify.error("Something went wrong while updating employee details");
            }
        });
    };

    $scope.close = function () {
        $scope.modalInstance.close();
    }
});