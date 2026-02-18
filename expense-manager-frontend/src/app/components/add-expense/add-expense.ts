import { ExpenseService } from './../../services/expense';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './add-expense.html',
  styleUrl: './add-expense.css'
})
export class AddExpenseComponent {

  expenseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private router: Router
  ) {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      category: ['Food', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    console.log("Form Status:", this.expenseForm.status); 
    console.log("Form Value:", this.expenseForm.value);   
    if (this.expenseForm.valid) {
      this.expenseService.saveExpense(this.expenseForm.value).subscribe(
        response => {
          console.log('Expense saved!', response);
          window.location.reload(); 
        },
        error => console.error('Error saving expense:', error)
      );
    }
  }
}