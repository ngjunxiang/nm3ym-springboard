import { RouteInfo } from '../../../shared/sidebar/sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/cm/dashboard', title: 'Dashboard', icon: 'mdi mdi-view-dashboard', class: '', label: '', labelClass: '', extralink: false, submenu: []
    },
    {
        path: '/cm/checklist', title: 'Checklists', icon: 'mdi mdi-playlist-check', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/cm/checklist/manage', title: 'Manage Checklists', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/checklist/create', title: 'New Checklist', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/checklist/logs', title: 'View Logs', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    },
    {
        path: '/cm/faq', title: 'FAQ', icon: 'mdi mdi-comment-question-outline', class: 'has-arrow', label: '', labelClass: '', extralink: false, 
        submenu: [
            { path: '/cm/faq/manage', title: 'Manage', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/faq/createFAQ', title: 'Create', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/faq/myAnswers', title: 'My Answers', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
        ]
    },
    {
        path: '/cm/faq', title: 'NLU Trainer', icon: 'mdi mdi-memory', class: 'has-arrow', label: '', labelClass: '', extralink: false, 
        submenu: [
            { path: '/cm/faq/trainModel', title: 'Train Model', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/faq/clean', title: 'Clean Data', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/faq/synonym', title: 'Manage Synonyms', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    },
    {
        path: '/cm/upload', title: 'Upload Files', icon: 'fas fa-file-upload', class: 'has-arrow', label: '', labelClass: '', extralink: false,
        submenu: [
            { path: '/cm/upload/agmtDoc', title: 'Agmt - Doc Mapping', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] },
            { path: '/cm/upload/reg51', title: 'Reg51', icon: '', class: '', label: '', labelClass: '', extralink: false, submenu: [] }
        ]
    }
];

