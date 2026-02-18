import { ExpenseService } from './../../services/expense';
import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartType, ChartOptions, ChartConfiguration } from 'chart.js';
import { Expense } from '../../models/expense';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BaseChartDirective, CommonModule], 
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  
  prediction: number = 0;
  errorMsg: string | null = null;
  loading: boolean = false;

  getPrediction() {
    this.loading = true;
    this.errorMsg = null;
    this.expenseService.getPrediction().subscribe({
      next: (data: any) => {
        if (data && typeof data.prediction === 'number') {
          this.prediction = data.prediction;
        } else if (data && data.error) {
          this.errorMsg = data.error;
        } else {
          this.errorMsg = 'Unexpected response from server.';
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Prediction request failed', err);
        this.errorMsg = 'Prediction service is unavailable.';
        this.loading = false;
      },
    });
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: true,
        position: 'right', 
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 12
          }
        }
      }
    }
};
  public pieChartLabels: string[] = [];
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';

  totalExpense = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.expenseService.getExpenses().subscribe((data) => {
      this.calculateChartData(data);
    });
  }

  calculateChartData(expenses: Expense[]) {
    this.totalExpense = expenses.reduce((sum, current) => sum + current.amount, 0);

    
    const categoryMap = new Map<string, number>();

    expenses.forEach((exp) => {
      const currentTotal = categoryMap.get(exp.category) || 0;
      categoryMap.set(exp.category, currentTotal + exp.amount);
    });

    this.pieChartLabels = Array.from(categoryMap.keys());
    this.pieChartData = {
      labels: this.pieChartLabels,
      datasets: [
        {
          data: Array.from(categoryMap.values()),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'], // Colors
        },
      ],
    };
  }
}
