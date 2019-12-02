// @flow
export type OnChange = (entry: IntersectionObserverEntry) => any;
export type Observe = (node: HTMLElement, onChange: OnChange) => any;
export type Unobserve = (node: HTMLElement) => any;
