import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskCrudService {

  private taskList: Task[] = [];
  private taskListSubject = new Subject<Task[]>();

  constructor() { }

  publishTasks(task: Task[]) {
    this.taskListSubject.next(task);
  }

  receiveTasks(): Observable<Task[]> {
    return this.taskListSubject.asObservable();
  }

  createTask(task: Task): void {
    const index = this.taskList.findIndex(x => x.id === task.id);
    if (index !== -1) {
      this.taskList.splice(index, 1);
    }
    let isTheOldest = true;
    for (let [i, taskFromTheList] of this.taskList.entries()) {
      if (task.dueDate > taskFromTheList.dueDate) {
        this.taskList.splice(i, 0, task);
        isTheOldest = false;
        break;
      }
    }
    if (isTheOldest) {
      this.taskList.push(task);
    }
    this.publishTasks(this.taskList.slice());
  }

  deleteTask(taskId: number): void {
    this.taskList.forEach((task, index) => {
      if (task.id === taskId) {
        this.taskList.splice(index, 1);
        return;
      }
    });
    this.taskListSubject.next(this.taskList.slice());
  }

}
