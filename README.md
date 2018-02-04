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
  type: 'string' (by default) | 'number' | 'date',
  validate: (value: String) => Boolean
} 
```

Returns props:
- List of fields values (`firstName`, `lastName`, `email`, etc.)
- Object with `errors`
- `submitReady` - returns true when no errors
- `onChange` - function that returns `onChange` handler
- `onClear` - function that set values to initial state
