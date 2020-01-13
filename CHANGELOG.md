# Changelog

React Intersection adheres to [Semantic Versioning](http://semver.org/).

## [2.0.2] 2019-12-03

### Fixes

- IntersectionRoot doesn't observe the root element correctly

## [2.0.1] 2019-12-03

### Fixes

- IntersectionRoot throws 'observe' and 'unobserve' undefined error on first load

## [2.0.0] 2019-11-29

- Updated dependencies
- Refactored to use React's new Context API
- Removed ReactDOM.findDOMNode for Refs
- Updated devDependencies

## [1.0.6] 2019-11-12

### Fixes

- Unobserve only once as Edge browsers throws a TypeMismatchError

## [1.0.5] 2018-03-06

### Fixes

- Ensuring thresholds are actually different before resetting `IntersectionObserver`.

## [1.0.4] 2018-03-06

### Fixes

- Fixing bug with `activeObserver` list doubling.

## [1.0.3] 2018-01-02

### Fixes

- Making `nextProps` check more specific as `children === nextProps.children` is always `false`.

## [1.0.2] 2018-01-02

### Fixes

- Moving React to a peer dependency.

## [1.0.1] 2018-01-02

### Fixes

- Include `lib` directory.

## [1.0.0] 2018-01-02

- First publish.