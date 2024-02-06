import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item',
      },
      {
        id: 'basic',
        title: 'Manage Incidents',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'addInc',
            title: 'Add Incident',
            type: 'item',
            url: '/add-incident',
          },
          {
            id: 'showInc',
            title: 'Show Incidents',
            type: 'item',
            url: '/incidents-list',
          }
        ],
      }
      ,
      {
        id: 'basic',
        title: 'Manage Users',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'addInc',
            title: 'Add User',
            type: 'item',
            url: '/add-user',
          },
          {
            id: 'showInc',
            title: 'Show Users',
            type: 'item',
            url: '/users-list',
          }
        ],
      }
    ],
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
