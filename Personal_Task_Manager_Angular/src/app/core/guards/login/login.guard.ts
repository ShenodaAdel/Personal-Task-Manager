import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const loginGuard: CanActivateFn = (route, state) => {
  const toastrService=inject(ToastrService);
  const router=inject(Router);
  const platformId=inject(PLATFORM_ID);
  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('UserLogin') !== null) {
      toastrService.error("You are not allowed to access  this page", "Error!");
      router.navigate(['/tasks']);
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }

};
