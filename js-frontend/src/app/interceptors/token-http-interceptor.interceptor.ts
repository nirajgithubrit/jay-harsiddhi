import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

export const tokenHttpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router)
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: accessToken
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      // 🔹 If access token expired
      if (error.status === 401) {

        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
          logout();
          return throwError(() => error);
        }

        // 🔹 Call refresh-token API
        return http.post<any>(environment.apiUrl + '/auth/refresh-token', {
          refreshToken
        }).pipe(
          switchMap((res) => {

            // 🔹 Save new access token
            localStorage.setItem('accessToken', res.accessToken);

            // 🔹 Retry original request with new token
            const retryReq = req.clone({
              setHeaders: {
                Authorization: res.accessToken
              }
            });

            return next(retryReq);
          }),
          catchError(err => {
            logout();
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );

  function logout() {
    localStorage.clear();
    router.navigateByUrl('/login')
  }
};
