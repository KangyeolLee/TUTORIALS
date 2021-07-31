import { ClassElement } from 'typescript';
import { accType, curType } from './types';

export const html = (str: TemplateStringsArray, ...args: unknown[]) => {
  const resultHTML = str.map((s, i) => `${s}${args[i] || ''}`).join('');
  const parser = new DOMParser();
  const doc = parser.parseFromString(resultHTML, 'text/html');
  return doc.body;
};

export const customEventEmitter = (eventType: string, detail?: object) => {
  document.dispatchEvent(
    new CustomEvent(eventType, {
      detail,
    })
  );
};

export function isClass(value: ClassElement) {
  return Boolean(value && value.toString().startsWith('class '));
}

export const addComma = (str: string) =>
  str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export async function asyncSetState(...rest: Promise<curType>[]) {
  const promises = await Promise.all(rest);
  const results = promises
    .flatMap((res) => res)
    .reduce((acc: accType, cur) => {
      if (!acc[cur.name]) {
        acc[cur.name] = { observer: cur.observer, data: cur.data };
        return acc;
      }

      acc[cur.name] = {
        ...acc[cur.name],
        data: { ...acc[cur.name].data, ...cur.data },
      };
      return acc;
    }, {});

  Object.values(results).forEach((res) => res.observer.setState(res.data));
}
