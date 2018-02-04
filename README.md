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
  validate: (value: String) => Boolean,
  defaultValue: Any
} 
```

##### Returns props:
- List of fields values (`firstName`, `lastName`, `email`, etc.)
- Object with `errors`
- `submitReady` - returns true when no errors
- `onChange` - function that returns `onChange` handler
- `onClear` - function that set values to initial state

##### Ussage example:
```js
const hoc = withInputs({
  firstName: {
    type: 'string',
    validate: value => value.length > 0 && value.length < 25,
    defaultValue: 'Bob',
  },
  birthday: {
    type: 'date',
    validate: value => (new Date().getFullYear() - value.getFullYear()) > 18,
  },
});
 
export default hoc(BaseComponent);
```


### `withToggle()`

```js
withToggle(
  propName: String,
  toggleName: String,
  defaultValue: Boolean
): HigherOrderComponent
```

Passes two additional props to the base component: a state value, and a function to toggle that Boolean state value.
Also you get 2 functions: `show` and `hide` for handle state.

##### Returns props:
- `[propName]: Boolean`
- `[toggleName]: Function`
- `show: Function`
- `hide: Function`

##### Ussage example:
```js
const hoc = withToggle('isOpened', 'toggle', false);
 
export default hoc(BaseComponent);
```
