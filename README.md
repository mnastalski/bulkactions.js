# Bulkactions.js
Library for easy bulk actions checkbox management

## Demo
 - [Basic example](https://htmlpreview.github.io/?https://github.com/mnastalski/bulkactions.js/blob/master/examples/bulkactions.html)
 - [Example usage of events](https://htmlpreview.github.io/?https://github.com/mnastalski/bulkactions.js/blob/master/examples/bulkactions_events.html)

## Features
 - Check/Uncheck all elements
 - Check/Uncheck elements with shift key
 - Return a list of checked objects
 - Return a list of values of checked elements
 - Return count of checked elements

## Requirements
 - jQuery 1.7.0 or higher

## Usage
Include the script on your page (after jQuery) 
```html
<script src="path/to/jquery.js"></script>
<script src="path/to/bulkactions.min.js"></script>
```

Add some checkboxes, an element that will display count, a check/uncheck all button (must have `.select` and `.unselect` class)
```html
<input type="checkbox" name="bulk_checkbox" value="1"> Box 1<br>
<input type="checkbox" name="bulk_checkbox" value="2"> Box 2<br>
<input type="checkbox" name="bulk_checkbox" value="3"> Box 3<br>

Currently selected checkboxes: <span class="bulk-checked-count">0</span><br>

<button class="bulk-check-all select">Check all</button>
<button class="bulk-check-all unselect">Uncheck all</button>
```

Bind the library using names/classes specified above
```javascript
BulkActions.bind({
    checkboxes: 'input[name="bulk_checkbox"]',
    count: '.bulk-checked-count',
    checker: '.bulk-check-all'
});
```

And you are set! You can find the complete example in the `examples/` folder.

## Options
#### checkbox
Checkboxes the library should bind to.  
*Default:* `input[type="checkbox"]`


#### count
An element that displays the amount of currently checked checkboxes.  
*Default:* `undefined	`

#### checker
Elements responsible for checking and unchecking all checkboxes. The checker must have the `.select` class and unchecker must have the `.unselect` class.  
*Default:* `undefined`


## Events
| Name           | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `checkAll()`   | Checks all elements                                          |
| `uncheckAll()` | Unchecks all elements                                        |
| `clickAll()`   | Checks or uncheck all elements depending on current state    |
| `getChecked()` | Returns a list of checked objects as *array*                 |
| `getCheckedCount()` | Returns the *number* of checked elements                |
| `getCheckedValues(separator)` | Returns a *string* of checked elements' values split by `separator` or<br>an *array* of values if the `separator` is not specified                 |


## Copyright and license
Copyright 2017 Mateusz Nastalski. Released under the [MIT license](LICENSE).
