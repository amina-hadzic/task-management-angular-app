import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskCrudService } from 'src/app/shared/services/task-crud.service';
import { TasksComponent } from '../tasks/tasks.component';
import { Task } from '../../shared/model/task.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomeComponent {

  taskList: Task[] = [];
  dataSource = new MatTableDataSource(this.taskList);
  displayedColumns = ['title', 'dueDate', 'status', 'actions'];
  expandedElement: Task | null = null;

  constructor(public dialog: MatDialog,
    private taskCrudService: TaskCrudService) {
  }

  ngOnInit(): void {
    this.taskCrudService.receiveTasks().subscribe(taskList => {
      this.taskList = taskList;
      this.dataSource = new MatTableDataSource(this.taskList);
    });
  }

  openCreateTaskDialog(): void {
    const dialogRef = this.dialog.open(TasksComponent);
  }

  openEditTaskDialog(id: number): void {
    const taskToEdit = this.taskList.filter(task => task.id === id);
    if (!taskToEdit) {
      return;
    }
    const taskComponent = this.dialog.open(TasksComponent);
    taskComponent.componentInstance.setTaskData(taskToEdit[0]);
  }

  openDeleteDialog(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.taskCrudService.deleteTask(taskId);
      this.dataSource = new MatTableDataSource(this.taskList);
    });
  }

}


