import { CanActivateFn } from '@angular/router';

export const authguardGuard: CanActivateFn = (route, state) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  if (user === null) {
    return false;
  }
  return true;
};
