import { Injectable } from '@angular/core';
import { bHideIncidentMenuItems, getEnumText } from 'src/app/Models/UserRole';

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

var incidentMenuItems: any = {
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
    },          
  ],
};

if(bHideIncidentMenuItems()) {
  incidentMenuItems = {};
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
      incidentMenuItems
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
