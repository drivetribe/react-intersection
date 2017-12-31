// @flow
import type { OnChange } from './types';

type Props = {
  root?: ?HTMLElement,
  rootMargin?: string,
  threshold?: number[]
};

type QueuedItem = {
  child: HTMLElement,
  onChange: OnChange
};

export default class IntersectionObserverWrapper {
  observedQueue: QueuedItem[] = [];
  observedMap: WeakMap<HTMLElement, Function> = new WeakMap();
  observer: IntersectionObserver;
  props: Props;

  constructor({ root, rootMargin = '0px 0px 0px 0px', threshold = [0, 1]}: Props) {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(this.fireListeners, { root, rootMargin, threshold });
    this.flushQueue();
  }

  flushQueue() {
    if (!this.observer) return;

    this.observedQueue.forEach(({ child, onChange }: QueuedItem) => {
      this.observedMap.set(child, onChange);
      this.observer.observe(child);
    });
  }

  fireListener = (entry: IntersectionObserverEntry) => {
    const onChange = this.observedMap.get(entry.target);
    if (onChange) onChange(entry);
  };

  fireListeners = (entries: IntersectionObserverEntry[]) => entries.forEach(this.fireListener);

  observe = (child: HTMLElement, onChange: OnChange) => {
    this.observedQueue.push({ child, onChange });
    this.flushQueue();
  };

  unobserve = (child: HTMLElement) => {
    this.observedMap.delete(child);
    this.observer.unobserve(child);
  };

  disconnect() {
    this.observer.disconnect();
  }
}
