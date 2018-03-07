# custom-hoc

# Higher-order components:


### `compose()`

```js
compose(
  ...functions: Array<Function>: Function,
): HigherOrderComponent
```

Combines multiple Higher-order components into one Higher-order component


##### Returns props:
- No props 

##### Ussage example:
```js
const hoc = compose(
  withToggle(),
  withInputs({ email: 1, name: 1  }),
);
 
export default hoc(BaseComponent);
```



### `withInputs()`

```js
withInputs(
  fields: Object | (props: Object) => Object
): HigherOrderComponent
```
Accepts object which has key (controlled input field name) and value (config)
Config can contains:
```js
{
  type: string, // allowed types: string | number | date | array
  validate: (value: string) => boolean,
  defaultValue: any, // default values: string: '', number: 0, date: new Date()
} 
```

##### Returns props:
- List of fields values (`firstName`, `lastName`, `email`, etc.)
- `errors: Object `Errors list
- `submitReady: boolean` - Returns true when no errors
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
    validate: value => (new Date().getFullYear() - value.getFullYear()) > 18, // // greater than 15 year
  },
  age: {
    type: 'number',
    validate: value => value >= 21, // greater than 21 year
    defaultValue: 18,
  },
  hobbies: {
    type: 'array',
    validate: value => value.length > 1, // more than one hobby
  },
});
 
export default hoc(BaseComponent);
```


### `withToggle()`

```js
withToggle(              // By default
  propName: string,      // 'isOpened'
  toggleName: string,    // 'toggle'
  defaultValue: boolean, // false
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
  shouldRenderFunction: (props: Object) => boolean
): HigherOrderComponent
```

Determines the cases in which the component should render

##### Returns props:
- No props 

##### Ussage example:
```js
const hoc = shouldRender(props => props.shouldRenderProperty);
 
export default hoc(BaseComponent);
```


### `withOffset()`

```js
withOffset(
  getAnchor: (props: Object) => string, // CSS selector or Node
  transition: number, // optional
): HigherOrderComponent
```

Calculates position of component relative to anchor (CSS selector or Node).
Also recalculate new position after resizing window
##### Returns props:
- `offset: Object` Object with position - `{ top: Number, left: Number }`

##### Ussage example:
```js
const hoc = withOffset(
  props => props.anchor, // anchor: '.btn' | Node
  200,                   // Time for animation in ms 
);
 
export default hoc(BaseComponent);
```


### `appendToBody()`

```js
appendToBody(
  className: string
): HigherOrderComponent
```

Creates portal for your element and append it to body

##### Returns props:
- No props

##### Ussage example:
```js
const hoc = appendToBody(
  'opacity-50',
);
 
export default hoc(BaseComponent);
```


### `withOutsideClick()`

```js
withOutsideClick(
  getOnClick: (props: Object) => Function,
  useEscape: boolean,
  additionalKeyCodes: Array<number>,
): HigherOrderComponent
```

Adds Event Listeners for your wrapped Component.
When you click outside of Component you can fire callback.
Also youcan pass additional `keyCodes` for firing or include "Escape" - `useEscape`

##### Returns props:
- No props

##### Ussage example:
```js
const hoc = withOutsideClick(
  props => props.onHide, // Returns null (by default)
  false,                 // true (by default)
  [27, 13, 65],
);

export default hoc(BaseComponent);
```


### `setRoles()`

```js
setRoles(
  gerRoles: (props: Object) => Array<string> | (props: Object) => string,
): HigherOrderComponent
```

Sets user roles to context. You can pass String or Array of Strings 


##### Returns props:
- No props

##### Ussage example:
```js
const hoc = setRoles(
  props => props.currentUser.roles, // Array or String
);
 
export default hoc(BaseComponent);
```


### `withRoles()`

```js
withRoles(
  roles: Array<string> | string,
): HigherOrderComponent
```

Compares passed `roles` with `roles` from context and checks cases when component should render.
It should be used with `setRoles`


##### Returns props:
- `roles` Returns `roles` value from context

##### Ussage example:
```js
const hoc = withRoles(
  ['admin', 'member'], // Roles for comparing - String or Array of String
);
 
export default hoc(BaseComponent);
```

