import './styles';
import Component from '@/Core/Component';
import { Props, State } from '@/utils/types';
import { html } from '@/utils/helper';

const data = [
  {
    percent: 15,
    color: '#80e080',
  },
  {
    percent: 35,
    color: '#4fc3f7',
  },
  {
    percent: 20,
    color: '#9575cd',
  },
  {
    percent: 30,
    color: '#f06292',
  },
];

export default class DonutChart extends Component<State, Props> {
  template() {
    return html`
      <svg
        id="donut-chart"
        width="100%"
        height="100%"
        xmlns="http://w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 100 100"
      ></svg>
    `;
  }

  mounted() {
    const $svg = document.querySelector('svg#donut-chart');
    let filled = 0;
    data.forEach((d, i) => {
      const circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );
      const startAngle = -90;
      const radius = 30;
      const cx = 50,
        cy = 50;
      const strokeWidth = 15;
      const dashArray = 2 * Math.PI * radius;
      const dashOffset = dashArray - (dashArray * d.percent) / 100;
      const currentDuration = (800 * d.percent) / 100;
      const delay = (800 * filled) / 100;
      const angle = (filled * 360) / 100 + startAngle;
      circle.setAttribute('r', radius);
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('fill', 'transparent');
      circle.setAttribute('stroke', d.color);
      circle.setAttribute('stroke-width', strokeWidth);
      circle.setAttribute('stroke-dasharray', dashArray);
      circle.setAttribute('stroke-dashoffset', dashArray);
      circle.style.transition =
        'stroke-dashoffset ' + currentDuration + 'ms linear ' + delay + 'ms';
      circle.setAttribute(
        'transform',
        'rotate(' + angle + ' ' + cx + ' ' + cy + ')'
      );
      $svg?.append(circle);
      filled += d.percent;
      setTimeout(function () {
        circle.style['stroke-dashoffset'] = dashOffset;
      }, 100);
    });
  }
}
