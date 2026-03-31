
export enum Endpoints {
    //users
    LOGIN = 'users/login',
    REGISTER = '/users/register', 
    PROFILE = '/users/profile',
    LOGOUT = '/users/logout',
    USERS = '/users',
    REFRESH_TOKEN = '/users/refresh',
    CHANGE_PASSWORD = '/users/change-password',
    //jobs
    JOBS = '/jobs',
    JOB = '/jobs/:id',
    JOBS_BY_CATEGORY = '/jobs/category',
    JOBS_BY_EMPLOYER = '/jobs/employer',
    //applications
    APPLICATIONS = '/applications',
    APPLICATION = '/applications/:id',    
}