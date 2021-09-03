import Observable from '@/Core/Observable';
import { curType, Today } from '@/utils/types';

class DateModel extends Observable {
  today: Today;
  key: string = 'date';

  constructor() {
    super();
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    this.today = {
      year,
      month,
    };
  }

  getPrevDate() {
    let { year, month } = this.today;
    month -= 1;
    if (month === 0) {
      year -= 1;
      month += 12;
    }

    this.today = { year, month };
    const prevDate = { today: this.today };
    return this.notify(this.key, prevDate);
  }

  getNextData() {
    let { year, month } = this.today;
    month += 1;
    if (month === 13) {
      year += 1;
      month -= 12;
    }

    this.today = { year, month };
    const nextDate = { today: this.today };
    return this.notify(this.key, nextDate);
  }
}

export default new DateModel();
