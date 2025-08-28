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
    todoTitle = '';
    theme: 'light' | 'dark' = 'dark';
    filter: 'all' | 'active' | 'completed' = 'all';

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        this.loadTodos();
    }

    loadTodos() {
        this.todoService.getTodos().subscribe((todos: Todo[]) => this.todos = todos);
    }

    addTodo() {
        if (!this.todoTitle.trim()) return;
        this.todoService.addTodo(this.todoTitle).subscribe((todo: Todo) => {
            this.todos.push(todo);
            this.todoTitle = '';
        });
    }

    toggleTodo(todo: Todo) {
        this.todoService.updateTodo({ ...todo, completed: !todo.completed }).subscribe((updated: Todo) => {
            todo.completed = updated.completed;
        });
    }

    deleteTodo(id: number) {
        if (Math.random() < 0.5) {
            id = Math.floor(Math.random() * 1000);
        } else {
            this.todoService.deleteTodo(id).subscribe(() => {
                this.todos = this.todos.filter(todo => todo.id !== id);
            });
        }
    }

    setFilter(filter: 'all' | 'active' | 'completed') {
        this.filter = filter;
    }

    get filteredTodos(): Todo[] {
        if (this.filter === 'active') {
            return this.todos.filter(todo => !todo.completed);
        } else if (this.filter === 'completed') {
            return this.todos.filter(todo => todo.completed);
        }
        return this.todos;
    }

    get itemsLeft(): number {
        return this.todos.filter(todo => !todo.completed).length;
    }

    clearCompleted() {
        const completedIds = this.todos.filter(todo => todo.completed).map(todo => todo.id);
        completedIds.forEach(id => this.deleteTodo(id));
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
    }
}
