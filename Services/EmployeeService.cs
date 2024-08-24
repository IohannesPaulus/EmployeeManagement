using EmployeeManagement.Models;
using System.Linq.Expressions;

namespace EmployeeManagement.Services
{
    public class EmployeeService : IEmployeeService
    {
        /// <summary>
        /// Simulated employee list.
        /// </summary>
        private static List<Employee> employees = new List<Employee>();

        public List<Employee> GetAllEmployees()
        {
            return employees;
        }

        /// <summary>
        /// Get a employee by using the Id.
        /// </summary>
        public Employee GetEmployeeById(int employeeId)
        {
            return employees.FirstOrDefault(e => e.Id == employeeId);
        }

        /// <summary>
        /// Add a employee.
        /// </summary>
        public bool AddEmployee(Employee employee)
        {
            //If does not ocurrs an error, it wont enter "catch" sentence, so it means employee was added successfully.
            try{
                
                if(employees.FirstOrDefault() == null)
                {
                    employee.Id = 1;
                }
                else
                {
                    employee.Id = employees.LastOrDefault().Id + 1;
                }
                
                employees.Add(employee);
                return true;
            }
            catch(Exception Ex){

                return false;
            }           
        }

        /// <summary>
        /// Update the employee info.
        /// </summary>
        public bool UpdateEmployee(Employee employee)
        {
            var existingEmployee = employees.FirstOrDefault(e => e.Id == employee.Id);
            if (existingEmployee != null)
            {
                existingEmployee.Name = employee.Name;
                existingEmployee.Position = employee.Position;
                existingEmployee.Office = employee.Office;
                existingEmployee.Salary = employee.Salary;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Delete a employee.
        /// </summary>
        public bool DeleteEmployee(int id)
        {
            var employee = employees.FirstOrDefault(e => e.Id == id);
            if (employee != null)
            {
                employees.Remove(employee);
                return true;
            }
            return false;
        }
    }
}
