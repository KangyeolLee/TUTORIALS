import './reset';
import { initRouter, Route } from '@/Core/Router';
import Home from '@/View/Home/index';
import Header from '@/Components/Header';
import Main from '@/View/Main';
import Calendar from '@/View/Calendar/index';
import Charts from '@/View/Charts/index';

const $app = document.querySelector('.content-wrapper') as HTMLElement;
const $header = document.querySelector('header') as HTMLElement;
const routes: Route[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/main', component: Main },
  { path: '/calendar', component: Calendar },
  { path: '/charts', component: Charts },
];

function init() {
  new Header($header);
  initRouter({ $app, routes });
}

init();
