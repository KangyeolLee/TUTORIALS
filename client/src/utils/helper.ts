import { ClassElement } from 'typescript';

export const html = (str: TemplateStringsArray, ...args: unknown[]) =>
  str.map((s, i) => `${s}${args[i] || ''}`).join('');

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
