import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../components/todo/todo.component';

@Injectable({ providedIn: 'root' })
export class TodoService {
    private apiUrl = 'http://localhost:3000/api/todos';

    constructor(private http: HttpClient) { }

    getTodos(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.apiUrl).pipe(
            catchError(this.handleError<Todo[]>('getTodos'))
        );
    }

    addTodo(title: string): Observable<Todo> {
        return this.http.post<Todo>(this.apiUrl, { title }).pipe(
            catchError(this.handleError<Todo>('addTodo'))
        );
    }

    deleteTodo(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError<void>('deleteTodo'))
        );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo).pipe(
            catchError(this.handleError<Todo>('updateTodo'))
        );
    }

    /** Generic error handler */
    private handleError<T>(operation = 'operation') {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed:`, error);

            const message = error.error?.message || error.statusText || 'An unknown error occurred';

            return throwError(() => new Error(message));
        };
    }
}
