# custom-hoc

# Higher-order components:

### `withInputs()`

```js
withInputs(
  fields: Object
): HigherOrderComponent
```
Accepts object which has key (controlled input field name) and value (config)
Config can contains:
```
{
  type: 'string' (by default) | 'number' | 'date': String,
  validate: (value: String) => Boolean, | true
  defaultValue: Any | 'string': '' | 'number': 0 | 'date': new Date()
} 
```

##### Returns props:
- List of fields values (`firstName`, `lastName`, `email`, etc.)
- `errors: Object `Errors list
- `submitReady: Boolean` - Returns true when no errors
- `onChange: Function` - Returns `onChange` event handler. Receives field name and callback
- `onClear: Function` - Sets all values to initial state. Receives callback

##### Ussage example:
```js
const hoc = withInputs({
  firstName: {
    validate: value => value.length > 0 && value.length < 25,
    defaultValue: 'Bob',
  },
  birthday: {
    type: 'date',
    validate: value => (new Date().getFullYear() - value.getFullYear()) > 18,
  },
  number: {
    type: 'number',
    validate: value => value >= 21,
    defaultValue: 18,
  }
});
 
export default hoc(BaseComponent);
```


### `withToggle()`

```js
withToggle(              // By default
  propName: String,      // 'isOpened'
  toggleName: String,    // 'toggle'
  defaultValue: Boolean, // false
): HigherOrderComponent
```

Passes two additional props to the base component: a state value, and a function to toggle that Boolean state value.
Also you get 2 functions: `show` and `hide` for handle state.

##### Returns props:
- `[propName]: Boolean` State of value
- `[toggleName]: Function` Sets inverted `[propName]` state
- `show: Function` Sets `[propName]` to `true`
- `hide: Function` Sets `[propName]` to `false`

##### Ussage example:
```js
const hoc = withToggle('isOpened', 'toggle', false);
 
export default hoc(BaseComponent);
```


### `shouldRender()`

```js
shouldRender(
  shouldRenderFunction: Function, // Returns true (by default)
): HigherOrderComponent
```

Determines the cases in which the component should render

##### Returns props:
- No props 

##### Ussage example:
```js
const hoc = shouldRender(props => props.shouldRenderChildren);
 
export default hoc(BaseComponent);
```


### `withOffset()`

```js
withOffset(
  getAnchor: Function, // Returns null (by default)
  transition: Number,  // 0 (by default)
): HigherOrderComponent
```

Calculate position of component relative to anchor (CSS selector or Node).
Also recalculate new position after resizing window
##### Returns props:
- `node: Element` Node with position
- `offset: Object` Object with position - `{ top: Number, left: Number }`

##### Ussage example:
```js
const hoc = withOffset(
  props => props.anchor, // anchor: '.btn' | Element
  200,                   // Time for animation in ms 
);
 
export default hoc(BaseComponent);
```


