export class Task {
  id: number;
  title: string;
  desc: string;
  dueDate: Date;
  status: string;
  expired: boolean;

  constructor(id: number, title: string, desc: string, dueDate: Date, status: string) {
    this.id = id || (new Date().getTime() * 10000) + 621355968000000000;
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.status = status;
    this.expired = this.status === "active" && new Date() > this.dueDate;
  }

}
