using EmployeeManagement.Models;
using EmployeeManagement.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManagement.Controllers
{
    public class EmployeeController : Controller
    {       
        public EmployeeService EmployeeService = new EmployeeService();

        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Get the employee list in JSON format.
        /// </summary>
        [HttpGet]
        public JsonResult GetEmployees()
        {
            return Json(EmployeeService.GetAllEmployees());
        }

        /// <summary>
        /// Get the employee list in JSON format.
        /// </summary>
        [HttpGet]
        public JsonResult GetEmployeeById(int employeeId)
        {
            var result = Json(EmployeeService.GetEmployeeById(employeeId));
            return Json(result.Value);
        }

        /// <summary>
        /// Add a employee.
        /// </summary>
        [HttpPost]
        public ActionResult AddEmployee(Employee employee)
        {
            var result = EmployeeService.AddEmployee(employee);
            return Json(result);
        }

        /// <summary>
        /// Update the employee info.
        /// </summary>
        [HttpPut]
        public ActionResult UpdateEmployee(Employee employee)
        {
            var result = EmployeeService.UpdateEmployee(employee);
            return Json(result);
        }

        /// <summary>
        /// Delete a employee.
        /// </summary>
        [HttpDelete]
        public ActionResult DeleteEmployee(int employeeId)
        {
            var result = EmployeeService.DeleteEmployee(employeeId);
            return Json(result);
        }
    }
}
