import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { loginGuard } from './core/guards/login/login.guard';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
         canActivate:[loginGuard],
        children: [
        {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full'
            },
            {   
                path: 'login',
               

                loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
            }
        ]
    },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'tasks',
                loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent)
            },
            {
                path: 'update-task/:id',
                loadComponent: () => import('./pages/update-task/update-task.component').then(m => m.UpdateTaskComponent)
            },
            {
                path: 'detail-task/:id',
                loadComponent: () => import('./pages/detail-task/detail-task.component').then(m => m.DetailTaskComponent)
            },
            {
                path:'completed',
                loadComponent: () => import('./pages/completed/completed.component').then(m => m.CompletedComponent)    
            },
            {
                path:'postponed',
                loadComponent: () => import('./pages/postponed/postponed.component').then(m => m.PostponedComponent)    

            },
            {
                path: 'in-progress',
                loadComponent: () => import('./pages/in-progress/in-progress.component').then(m => m.InProgressComponent)

            },

            {
                path: 'profile',
                loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)

            }
            ,
            {
                path: 'setting',   
                loadComponent: () => import('./pages/setting/setting.component').then(m => m.SettingComponent)   
            }
            ,{
                path: 'contact-us',
                loadComponent: () => import('./pages/contact-us/contact-us.component').then(m => m.ContactUsComponent)
            }
           
        ]
    },
     {
                path: '**',
                loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
