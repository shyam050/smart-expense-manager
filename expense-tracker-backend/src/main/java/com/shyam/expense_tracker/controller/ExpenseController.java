package com.shyam.expense_tracker.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.shyam.expense_tracker.model.Expense;
import com.shyam.expense_tracker.service.ExpenseService;

@RestController

@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/expenses")
public class ExpenseController {
    private static final Logger log = LoggerFactory.getLogger(ExpenseController.class);
    private final ExpenseService service;

    public ExpenseController(ExpenseService service){
        this.service = service;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense){
        return service.addExpense(expense);
    }

    @GetMapping
    public List<Expense>  getAllExpenses(){
        return service.getAllExpenses();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        service.deleteExpense(id);
    }

    @GetMapping("/stats")
    public Map<String, Double> getStats() {
        return service.getExpenseStats();
    }

     @GetMapping("/predict")
    public Map<String, Object> getPrediction() {
        // 1. Get all expenses from DB
        List<Expense> expenses = service.getAllExpenses();
        
        // 2. Extract just the amounts (e.g., [500.0, 200.0, 150.0])
        List<Double> amounts = expenses.stream()
                                       .map(Expense::getAmount)
                                       .collect(Collectors.toList());

        // 3. Prepare JSON for Python
        Map<String, List<Double>> payload = new HashMap<>();
        payload.put("expenses", amounts);

        // 4. Call Python API (localhost:5000)
        String pythonUrl = "http://localhost:5000/predict";
        RestTemplate restTemplate = new RestTemplate();
        
        try {
            // We get back a Map like {"prediction": 650.0}
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Map<String, List<Double>>> request = new HttpEntity<>(payload, headers);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                pythonUrl,
                HttpMethod.POST,
                request,
                new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (Exception e) {
            log.error("Prediction call failed: {}", e.getMessage(), e);
            Map<String, Object> error = new HashMap<>();
            error.put("error", "AI Service is down");
            return error;
        }
    }
}
