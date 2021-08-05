import Component from '@/Core/Component';
import './styles';
import { html, asyncSetState } from '@/utils/helper';
import {
  CategoryModelType,
  CategoryType,
  ChartControllerType,
  DELETE_CATEGORY_COLOR,
  HistoryModelType,
  IHistory,
  Props,
  State,
  Today,
  TodayModelType,
} from '@/utils/types';
import HistoryModel from '@/Model/HistoryModel';
import ChartController from '@/Controller/ChartController';
import DateModel from '@/Model/DateModel';
import CategoryModel from '@/Model/CategoryModel';

interface IListStates extends State {
  today: Today;
  selectedCategory: string;
  selectedHistoryForCategory: IHistory[];
  categoryList: CategoryType[];
  statList?: number[];
}

type Point = number[];

const magicNumber = {
  WIDTH: 1920,
  HEIGHT: 700,
  CHART_TOP: 100,
  CHART_LEFT: 100,
  CHART_BOTTOM: 0,
  CHART_RIGHT: 100,
};

export default class LineChart extends Component<IListStates, Props> {
  historyModel!: HistoryModelType;
  dateModel!: TodayModelType;
  chartController!: ChartControllerType;
  categoryModel!: CategoryModelType;
  chartInfo!: {
    intervalX: number;
    maxValue: number;
  };

  async setup() {
    this.classIDF = 'LineChart';

    this.historyModel = HistoryModel;
    this.historyModel.subscribe(this.historyModel.key, this);
    this.chartController = ChartController;

    this.dateModel = DateModel;
    this.dateModel.subscribe(this.dateModel.key, this);

    this.categoryModel = CategoryModel;
    this.categoryModel.subscribe(this.categoryModel.key, this);

    this.$state = {
      selectedHistoryForCategory: [],
      selectedCategory: '',
      today: this.dateModel.today,
      categoryList: [],
    };

    asyncSetState(this.historyModel.getHistoryCard(this.$state.today));
    asyncSetState(this.categoryModel.getUserCategories());
  }

  template() {
    console.log(this.$state);
    return html`
      <svg
        version="1.1"
        id="line-chart"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 ${-magicNumber.HEIGHT} ${magicNumber.WIDTH} ${magicNumber.HEIGHT}"
        style="enable-background:new 0 0 ${magicNumber.WIDTH} ${magicNumber.HEIGHT};"
        xml:space="preserve"
      ></svg>
    `;
  }

  async mounted() {
    const { selectedCategory, categoryList } = this.$state!;

    if (selectedCategory && categoryList) {
      const category = categoryList.filter(
        (c) => c.type === selectedCategory
      )[0];
      await this.drawChart(
        selectedCategory,
        category ? category.color : DELETE_CATEGORY_COLOR
      );

      // 카테고리 클릭 시에만 lineChart 출력
      const lineChartView = document.querySelector(
        '#line-chart-view'
      ) as HTMLDivElement;
      const prevCategory = lineChartView.dataset.category;
      lineChartView.dataset.category = selectedCategory;

      if (!prevCategory || prevCategory === selectedCategory)
        lineChartView.classList.toggle('show');
    }
  }

  async drawChart(selectedCategory: string, color: string) {
    const { statList } = await this.historyModel.getAverageByMonth(
      2021,
      selectedCategory
    );
    const svg = this.$target.querySelector('#line-chart') as SVGElement;
    const dataPoint = this.getPoints(statList);

    const chart = this.getLineChartPath(dataPoint, color); // line graph
    const standYLine = this.getStandYLine(); // y축 가로선
    const xSection = this.getXSection(dataPoint); // month section
    const pointCircle = this.getPointCircle(dataPoint, color); // point
    const sectionPointGroup = this.makeSectionPointGroup(xSection, pointCircle);
    const defsElem = this.getDefs(color);
    svg.appendChild(defsElem);
    svg.appendChild(standYLine);
    svg.appendChild(chart);
    sectionPointGroup.forEach((group) => svg.appendChild(group));
  }

  // 곡선 그래프
  getLineChartPath(dataPoint: Point[], color: string) {
    const $path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    $path.setAttribute('class', 'line-chart-path');
    $path.setAttribute('d', this.getPathAttribute(dataPoint));
    $path.setAttribute('fill', `url('#myGradient')`); //, color);
    $path.setAttribute('stroke', color);
    $path.setAttribute('stroke-width', '4');
    $path.setAttribute('style', 'transform: scale(1, -1);');

    return $path;
  }

  getPoints(data: number[]): Point[] {
    const [graphWidth, graphHeight] = [
      magicNumber.WIDTH - (magicNumber.CHART_LEFT + magicNumber.CHART_RIGHT),
      magicNumber.HEIGHT - (magicNumber.CHART_TOP + magicNumber.CHART_BOTTOM),
    ];
    const intervalX = graphWidth / (data.length - 1);
    const max = Math.round((Math.max(...data) + 100000) / 10) * 10;

    this.chartInfo = {
      intervalX: intervalX,
      maxValue: graphHeight,
    };

    return data.reduce((acc: Point[], cur: number, i) => {
      const point: Point = [
        intervalX * i + magicNumber.CHART_LEFT,
        (cur / max) * graphHeight,
      ];
      return [...acc, point];
    }, []);
  }

  /**
   *
   * @param points Point List
   * @returns Point로 만든 Path Attribute
   */
  getPathAttribute(points: Point[]): string {
    const pointLine = points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point[0]},${point[1]}`;

      // start control point
      const [cpsX, cpsY] = this.getControlPoint(a[i - 1]);
      // end control point
      const [cpeX, cpeY] = this.getControlPoint(point, true);

      return `${acc} C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
    }, '');

    return [
      pointLine,
      `L ${points[points.length - 1][0]}, ${0}`,
      `L ${points[0][0]}, ${0}`,
      `L ${points[0][0]}, ${points[0][1]}`,
    ].join('');
  }

  setUnmount() {
    this.historyModel.unsubscribe(this.historyModel.key, this);
    this.dateModel.unsubscribe(this.dateModel.key, this);
    this.categoryModel.unsubscribe(this.categoryModel.key, this);
  }

  getControlPoint(current: Point, reverse: boolean = false): Point {
    const angle = reverse ? Math.PI : 0;
    const interval = Math.floor(magicNumber.WIDTH / (30 - 1));
    const length = interval;

    const x = current[0] + Math.cos(angle) * length;
    const y = current[1] + Math.sin(angle) * length;
    return [x, y];
  }

  // 그래프의 가로 선
  getStandYLine() {
    const $path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );
    $path.setAttribute('d', this.getStandLineAttribute());
    $path.setAttribute('fill', 'none');
    $path.setAttribute('stroke', '#d2d2d2');
    $path.setAttribute('stroke-width', '2');
    $path.setAttribute('style', 'transform: scale(1, -1)');

    return $path;
  }

  getStandLineAttribute() {
    const numY = 6;
    const intervalY = this.chartInfo.maxValue / numY;
    const lineY = [];
    for (let i = 0; i < numY + 1; i++) {
      lineY.push(intervalY * i);
    }
    return lineY.map((y) => `M ${0},${y} L ${magicNumber.WIDTH},${y}`).join('');
  }

  // 마우스 hover시 나타나는 section
  getXSection(dataPoint: Point[]) {
    const sections: SVGPathElement[] = [];
    const sectionPathList = this.getXSectionAttribute(dataPoint);
    sectionPathList.forEach((sectionPath) => {
      const $path = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
      );
      $path.setAttribute('d', sectionPath);
      $path.setAttribute('class', 'month-section');
      $path.setAttribute('style', 'transform: scale(1, -1);');

      sections.push($path);
    });

    return sections;
  }

  getXSectionAttribute(dataPoint: Point[]) {
    const halfInterval = this.chartInfo.intervalX / 2;

    return dataPoint.map((data, i) => {
      const left = data[0] - halfInterval;
      const right = data[0] + halfInterval;

      return `      
      M ${left},${0}
      L ${right}, ${0}
      L ${right}, ${this.chartInfo.maxValue}
      L ${left}, ${this.chartInfo.maxValue}
      L ${left}, ${0}
    `;
    });
  }

  getPointCircle(dataPoint: Point[], color: string) {
    const pointList: SVGCircleElement[] = [];

    dataPoint.forEach((data, idx) => {
      const $circle = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'circle'
      );

      $circle.setAttribute('class', 'month-point');
      $circle.setAttribute('cx', `${data[0]}`);
      $circle.setAttribute('cy', `${data[1]}`);
      $circle.setAttribute('r', `${10}`);
      $circle.setAttribute('fill', color);
      $circle.dataset.id = `${idx}`;
      $circle.setAttribute('style', 'transform: scale(1, -1);');

      pointList.push($circle);
    });

    return pointList;
  }

  makeSectionPointGroup(
    xSection: SVGPathElement[],
    pointCircle: SVGCircleElement[]
  ) {
    const groupList: SVGGElement[] = [];
    xSection.forEach((section, idx) => {
      const $group = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      );

      $group.setAttribute('class', 'section-point-group');
      $group.dataset.id = `${idx + 1}`;
      $group.appendChild(section);
      $group.appendChild(pointCircle[idx]);

      groupList.push($group);
    });

    return groupList;
  }

  getDefs(color: string) {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const [r, g, b] = [
      parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
    ];
    defs.innerHTML = `
      <linearGradient id="myGradient" gradientTransform="rotate(90)">
        <stop offset="0%"  stop-color="rgba(${r},${g},${b},0.05)" />
        <stop offset="40%" stop-color="rgba(${r},${g},${b},0.4)" />
        <stop offset="70%" stop-color="rgba(${r},${g},${b},0.5)" />
        <stop offset="100%" stop-color="rgba(${r},${g},${b},0.6)" />
      </linearGradient>
    `;
    return defs;
  }
}
