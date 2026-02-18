import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExpenseListComponent } from './components/expense-list/expense-list';
import { AddExpenseComponent } from './components/add-expense/add-expense';
import { DashboardComponent } from './components/dashboard/dashboard';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ExpenseListComponent,AddExpenseComponent,DashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('expense-manager-frontend');
}
