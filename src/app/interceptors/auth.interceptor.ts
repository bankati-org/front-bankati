import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding the token for login/register requests
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/auth/register')) {
    return next(req);
  }
  // Get the access token from local storage
  const accessToken = localStorage.getItem('accessToken');

  // If the token exists, add it to the request headers
  if (accessToken) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return next(cloned);
  }

  // If no token, proceed with the original request
  return next(req);
};
