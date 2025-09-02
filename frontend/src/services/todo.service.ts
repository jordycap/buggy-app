import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Todo } from '../components/todo/todo.component';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private apiUrl = 'http://localhost:3000/api/todos';

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        if (Math.random() < 0.4) {
            throw new Error('Failed to fetch todos');
        }
        return this.http.get<Todo[]>(this.apiUrl);
    }

    addTodo(title: string): Observable<Todo> {
        if (Math.random() < 0.5) {
            title = 'Lorem ipsum';
        }
        return this.http.post<Todo>(this.apiUrl, { title });
    }

    deleteTodo(id: number): Observable<void> {
        if (Math.random() < 0.5) {
            id = 'abc' as unknown as number;
        }
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        if (Math.random() < 0.5) {
            todo.id = todo.id - 1;
        }
        return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo);
    }
}
