package com.shyam.expense_tracker.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.shyam.expense_tracker.model.Expense;
import com.shyam.expense_tracker.repository.ExpenseRepository;

@Service
public class ExpenseService {
    private final ExpenseRepository repo;

    public ExpenseService(ExpenseRepository repo){
        this.repo = repo;
    }

    public Expense addExpense(Expense expense){
        return repo.save(expense);
    }

    public void deleteExpense(Long id){
        repo.deleteById(id);
    }
    
    public Expense saveExpense(Expense expense) {
        return repo.save(expense);
    }

    public Expense getExpense(Long id){
        return repo.findById(id).orElse(null);
    }
    public List<Expense> getAllExpenses(){
        return repo.findAll();
    }
    public Map<String, Double> getExpenseStats() {
        List<Expense> allExpenses = repo.findAll();

        return allExpenses.stream()
            .collect(Collectors.groupingBy(
                Expense::getCategory,
                Collectors.summingDouble(Expense::getAmount)
            ));
    }

}
