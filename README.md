

### A React interface for the Intersection Observer API

**React Intersection** provides a simple component-based interface to the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

It provides two core components: `IntersectionRoot` and `IntersectionElement`.

- **`IntersectionRoot`**: Creates a new `IntersectionObserver` with either the browser viewport or its direct DOM child as the observed `root`.
- **`IntersectionElement`**: Adds its direct DOM child as an observer of the nearest parent `IntersectionRoot`.

## Example

```javascript
class LazyLoadImage extends Component {
  state = {
    isVisible: false
  };

  checkVisibility = ({ isIntersecting }) => isIntersecting && this.setState({ isVisible: true });

  render() {
    const { src } = this.props;
    const { isVisible } = this.state;

    return (
      <IntersectionElement once onChange={this.checkVisibility}>
        <img src={isVisible ? src : ''}/>
      </IntersectionElement>
    );
  }
}

const Site = () => (
  <IntersectionRoot viewport>
    <LazyLoadImage src="path/to/image.jpg">
  </IntersectionRoot>
);
```

## Install

### npm

```bash
npm install react-intersection --save
```

## Usage

### Observe an element

`IntersectionElement` can wrap any DOM element.

By default, 

```javascript
import { IntersectionElement } from 'react-intersection';

const Item = () => (
  <IntersectionElement>
    <li></li>
  </IntersectionElement>
);
```

### Define a new root

`IntersectionRoot` is used to wrap an element that's to be used as a new `IntersectionObserver` `root`:

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
  <IntersectionRoot viewport margin="20px 20px 20px 20px">
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

##### `viewport?: boolean = false`

If `true`, sets the browser viewport

##### `margin?: string = '0px 0px 0px 0px'`

A space-delimited list of margins that effectively change the observed bounding box.

Follows the CSS pattern of top/right/bottom/left where `'10px 20px 30px 40px'` would give a right margin of `20px`.

If `IntersectionRoot` is **not** a viewport observer, these values can be defined as percentages.

##### `threshold?: number[] = [0, 1]`

An array of values between `0` and `1` that dictates at which ratios the IntersectionObserver should fire callbacks. Thresholds are fully explained in the [MDN Intersection Observer API article](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Thresholds).

## Browser support

### Intersection Observer API

[Browser support](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) | [Polyfill](https://www.npmjs.com/package/intersection-observer)

### WeakMap

[Browser support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#Browser_compatibility) | [Polyfill](https://www.npmjs.com/package/weakmap-polyfill)
