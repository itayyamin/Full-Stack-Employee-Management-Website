package check_point.demo.controller;

import check_point.demo.model.Employee;
import check_point.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/employee")
@CrossOrigin
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/add")
    public String add(@RequestBody Employee employee) {
        employeeService.saveEmployee(employee);
        return "New employee is added";

    }

    @GetMapping("/getAll")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> get(@PathVariable Integer id){
        try{
            Employee employee = employeeService.get(id);
            return new ResponseEntity<Employee>(employee,HttpStatus.OK);
        }catch (NoSuchElementException e){
            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@RequestBody Employee employee, @PathVariable Integer id){
        try{
            Employee existingEmployee=employeeService.get(id);
            employeeService.saveEmployee(employee);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch (NoSuchElementException e){
            return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Integer id){
        employeeService.delete(id);
        return "Deleted Employee with id "+id;
    }


}
