namespace EmployeeManagement.Models
{
    public class Employee
    {
        /// <summary>
        /// Identificador único del empleado.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Nombre completo del empleado. 
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Cargo del empleado. 
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// Oficina del empleado.
        /// </summary>
        public string Office { get; set; }

        /// <summary>
        /// Salario del empleado.
        /// </summary>
        public decimal Salary { get; set; }
    }
}
