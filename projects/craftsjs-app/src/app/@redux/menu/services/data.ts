import { MenuModel } from '@craftsjs/menu-admin';

export interface MenuModelTenant extends MenuModel {
    viewTenant?: boolean;
    children?: MenuModelTenant[];
}

export const menus: MenuModelTenant[] = [
    {
        id: '1',
        class: 'material-icons',
        value: 'business',
        title: 'tenant.title',
        isOpen: false,
        multiOption: false,
        url: '/admin/tenants',
        exact: true,
        permission: 'Page.Tenant',
        viewTenant: true
    },
    {
        id: '2',
        class: 'material-icons',
        value: 'library_books',
        title: 'edition.title',
        isOpen: false,
        multiOption: false,
        url: '/admin/editions',
        exact: true,
        permission: 'Page.Edition',
        viewTenant: true
    },
    {
        id: '3',
        class: 'material-icons',
        value: 'linear_scale',
        title: 'administration.title',
        isOpen: false,
        multiOption: true,
        exact: true,
        permission: 'Page.Administration',
        viewTenant: true,
        children: [
            {
                id: '3.1',
                class: 'material-icons',
                value: 'supervised_user_circle',
                title: 'role.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/roles',
                exact: true,
                permission: 'Page.Administration.Role',
                viewTenant: true,
            },
            {
                id: '3.2',
                class: 'material-icons',
                value: 'people',
                title: 'user.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/users',
                exact: true,
                permission: 'Page.Administration.User',
                viewTenant: true,
            },
            {
                id: '3.3',
                class: 'fas fa-sitemap',
                title: 'organizationUnit.title',
                isOpen: false,
                multiOption: false,
                url: '/admin/organization-units',
                exact: true,
                permission: 'Page.Administration.OrganizationUnit',
                viewTenant: false,
            },
        ]
    },
];
