import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error) => {
            if(error['error']['error']['status'] == "401") {
                this.router.navigate(['/signin']);
            }

            return throwError(error);
        }));
    }
}