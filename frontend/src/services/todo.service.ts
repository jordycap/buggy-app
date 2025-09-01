import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../components/todo/todo.component';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private apiUrl = 'http://localhost:3000/api/todos';

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addTodo(title: string): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, { title });
    }

    deleteTodo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
    }
}
