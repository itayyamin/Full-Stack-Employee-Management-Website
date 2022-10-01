package check_point.demo.service;

import check_point.demo.model.Employee;
import check_point.demo.repository.EmployeeRepository;

import java.util.List;

public interface EmployeeService {
    public Employee saveEmployee(Employee employee);

    public List<Employee> getAllEmployees();

    public Employee get(Integer id);

    public void delete(Integer id);


}
