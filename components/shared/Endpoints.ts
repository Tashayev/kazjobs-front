
export enum Endpoints {
    //users
    LOGIN = 'users/login',
    REGISTER = '/users/register', 
    PROFILE = '/users/profile',
    LOGOUT = '/users/logout',
    GET_USERS = '/users',
    REFRESH_TOKEN = '/users/refresh',
    //jobs
    JOBS = '/jobs',
    JOB = '/jobs/:id',
    //applications
    APPLICATIONS = '/applications',
    APPLICATION = '/applications/:id',    
}