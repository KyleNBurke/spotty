import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class authInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error) => {
            if(error['error']['error']['status'] == "401") {
                this.authService.authorized = false;
                //remove access token from local storage
                this.router.navigate(['/signin']);
            }

            return throwError(error);
        }));
    }
}