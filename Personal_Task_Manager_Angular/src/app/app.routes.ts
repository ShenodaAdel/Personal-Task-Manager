import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { Component } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
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
        children: [
            {
                path: 'tasks',
                loadComponent: () => import('./pages/tasks/tasks.component').then(m => m.TasksComponent)
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
                path:'add-new-task',
                loadComponent: () => import('./pages/add-new-task/add-new-task.component').then(m => m.AddNewTaskComponent)

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
           
        ]
    },
     {
                path: '**',
                loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
