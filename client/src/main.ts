import '@/scss/index';
import { initRouter } from '@/Core/Router';
import Home from '@/View/Home/index';
import Header from '@/Components/Header';
import MainView from '@/View/MainView';
import CalendarView from '@/View/CalendarView';
import Charts from '@/View/Charts/index';
import { Route } from './utils/types';

const $app = document.querySelector('.content-wrapper') as HTMLElement;
const $header = document.querySelector('header') as HTMLElement;
const routes: Route[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/main', component: MainView },
  { path: '/calendar', component: CalendarView },
  { path: '/charts', component: Charts },
];

function init() {
  new Header($header);
  initRouter({ $app, routes });
}

init();
