# React Intersection

## A React interface for the Intersection Observer API

**React Intersection** provides a simple component-based interface to the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

It provides three core components: `IntersectionRoot`, `IntersectionElement` and `IntersectionElementChild`.

- **`IntersectionRoot`**: **Optionally** defines a new `root` element for children `IntersectionElement` components to observe (browser viewport is used by default).
- **`IntersectionElement`**: Observes intersection events with its parent `IntersectionRoot` (or browser viewport if none defined).

## Install

### npm

```bash
npm install react-intersection --save
```

### Yarn

```bash
yarn add react-intersection
```

## Usage

### Observe 

### Define a new root

`IntersectionRoot` is used to wrap an element that's to be used as a new IntersectionObserver:

```javascript
import { IntersectionRoot } from 'react-intersection';

const ScrollableList = () => (
  <IntersectionRoot>
    <ul>
      {renderItems()}
    </ul>
  </IntersectionRoot>
);
```

In the above example, `ul` will be the `root` of the new IntersectionObserver that any children `IntersectionElement`s will observe.

### Define a new browser viewport root

By default, if an `IntersectionElement` is created that **isn't** the child of an `IntersectionRoot`, it'll observe a browser viewport IntersectionObserver with no `margin` and a `threshold` of `[0, 1]`.

To create a new browser viewport root with different settings, we can pass `root={null}` to `IntersectionRoot`:

```javascript
const IntersectViewportWithMargins = ({ children }) => (
  <IntersectionRoot root={null} margin="20px 20px 20px 20px">
    {children}
  </IntersectionRoot>
);
```

## API

### `IntersectionElement`

Observe when an element intersects with its closest `IntersectionRoot`

#### Props

##### `onChange: (e: IntersectionObserverEntry) => any`

Fires after every breached `threshold` on the `IntersectionRoot` (or browser viewport if none set).

Is provided an [IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) object.

##### `once?: boolean = false`

Stops firing events after the first `true` intersection.

### `IntersectionRoot`

Define a new IntersectionObserver.

**If no `root` property is defined, it only accepts a single child.**

#### Props

##### `root?: null`

Usually not set and defaults to the child element. If passed `null`, will create a new IntersectionObserver using the browser viewport.

##### `margin?: string = '0px 0px 0px 0p'`

A space-delimited list of margins that effectively change the observed bounding box.

Follows the CSS pattern of top/right/bottom/left where `'10px 20px 30px 40px'` would give a right margin of `20px`.

If `IntersectionRoot` is **not** a viewport observer, these values can be defined as percentages.

##### `threshold?: number[] = [0, 1]`

An array of values between `0` and `1` that dictates at which ratios the IntersectionObserver should fire callbacks. Thresholds are fully explained in the [MDN Intersection Observer API article](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Thresholds).

## Polyfill

React Intersection requires [Intersection Observer API browser support](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility).

For other browsers, you can optionally [install a polyfill](https://www.npmjs.com/package/intersection-observer).
