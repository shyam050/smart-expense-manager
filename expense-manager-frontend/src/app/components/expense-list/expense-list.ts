import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpenseService } from '../../services/expense';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './expense-list.html',
  styleUrl: './expense-list.css'
})
export class ExpenseListComponent implements OnInit {

  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.listExpenses();
  }

  listExpenses() {
    this.expenseService.getExpenses().subscribe(
      data => {
        this.expenses = data;
        console.log('Data received:', data); 
      }
    );
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe(
      () => {
        this.listExpenses(); 
      }
    )
  }
}