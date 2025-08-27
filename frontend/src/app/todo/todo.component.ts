import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { NgForOf, NgIf } from '@angular/common';

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'todo-component',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    todos: Todo[] = [];
    newTitle = '';

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() {
        this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos);
    }

    addTodo() {
        console.log('ran addTodo');
        console.log(this.newTitle);
        if (!this.newTitle.trim()) return;
        this.todoService.addTodo(this.newTitle).subscribe((todo: Todo) => {
            this.todos.push(todo);
            this.newTitle = '';
        });
    }

    toggleTodo(todo: Todo) {
        this.todoService.updateTodo({ ...todo, completed: !todo.completed }).subscribe((updated: Todo) => {
            todo.completed = updated.completed;
        });
    }
    deleteTodo(id: number) {
        this.todoService.deleteTodo(id).subscribe(() => {
            this.todos = this.todos.filter(todo => todo.id !== id);
        });
    }
}
