package check_point.demo.service;

import check_point.demo.model.Employee;
import check_point.demo.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee get(Integer id) {
        return employeeRepository.findById(id).get();
    }
    @Override
    public void delete(Integer id){
        employeeRepository.deleteById(id);
    }




}

