import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/model/task.model';
import { TaskCrudService } from 'src/app/shared/services/task-crud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  taskForm = new FormGroup({
    'id': new FormControl(null),
    'title': new FormControl(null, Validators.required),
    'desc': new FormControl(null),
    'dueDate': new FormControl(null, Validators.required),
    'status': new FormControl('active'),
  });
  statuses: string[] = ['active', 'finished'];

  constructor(private taskCrudService: TaskCrudService) {
  }

  setTaskData(task: Task) {
    this.taskForm.patchValue({
      id: task.id,
      title: task.title,
      desc: task.desc,
      dueDate: task.dueDate,
      status: task.status
    });
  }

  onSubmit() {
    const formData = this.taskForm.value;
    const newTask = new Task(formData.id, formData.title, formData.desc, formData.dueDate, formData.status);
    return this.taskCrudService.createTask(newTask);
  }
}
