/*!
 * Bulkactions.js v1.0.0 (https://github.com/mnastalski/bulkaction.js)
 * Copyright 2017 Mateusz Nastalski
 * Licensed under MIT
 */

var BulkActions = {
    /**
     * List of checked checkboxes
     */
    checked_list: [],

    $selector_checkbox: undefined,
    $selector_checker: undefined,
    $selector_count: undefined,

    /**
     * Binds bulk actions to the page
     *
     * @param options:
     *      * checkbox  Checkboxes selector
     *      * count     Count box selector
     *      * checker   Select/Unselect all selector
     */
    bind: function(options) {
        'use strict';

        options = options || {};

        if (!window.jQuery || $.fn.jquery < '1.7.0') {
            console.error('Bulkactions.js requires jQuery 1.7.0 or higher');
        }

        this.bindCheckbox(options.checkbox || 'input[type="checkbox"]');
        this.bindCount(options.count || '.bulkactions-count');
        this.bindChecker(options.checker || '.bulkactions-checker');

        this.setChecked();
    },

    /**
     * Binds the checkboxes to use
     * Binds shift selectable and onchange event to bound checkboxes
     *
     * @param selector
     */
    bindCheckbox: function(selector) {
        'use strict';

        this.$selector_checkbox = $(selector);

        this.bindShiftSelectable();

        this.$selector_checkbox.on('change', function () {
            BulkActions.setChecked();
        });
    },

    /**
     * Binds the count box to show the selected amount in
     * Disables clicking of it
     *
     * @param selector
     */
    bindCount: function(selector) {
        'use strict';

        this.$selector_count = $(selector);

        this.$selector_count.on('click', function (e) {
            e.preventDefault();
        });
    },

    /**
     * Binds the 'select all' selector
     *
     * @param selector
     */
    bindChecker: function(selector) {
        'use strict';

        this.$selector_checker = $(selector);

        this.$selector_checker.on('click', function (e) {
            e.preventDefault();

            BulkActions.clickAll();
        });
    },

    /**
     * Bind shiftSelectable() to our checkboxes
     * Allows group selecting of checkboxes using shift key
     * https://gist.github.com/AndrewRayCode/3784055
     */
    bindShiftSelectable: function() {
        'use strict';

        var lastChecked;

        this.$selector_checkbox.on('click', function (evt) {
            if (!lastChecked) {
                lastChecked = this;
                return;
            }

            if (evt.shiftKey) {
                var start = BulkActions.$selector_checkbox.index(this),
                    end = BulkActions.$selector_checkbox.index(lastChecked);

                BulkActions.$selector_checkbox.slice(Math.min(start, end), Math.max(start, end) + 1)
                    .prop('checked', lastChecked.checked)
                    .trigger('change');
            }

            lastChecked = this;
        });
    },

    /**
     * Calculates the amount of checked checkboxes and puts them into checked_list array (as object)
     */
    setChecked: function() {
        'use strict';

        this.checked_list = [];

        this.$selector_checkbox.filter(':checked').each(function () {
            BulkActions.checked_list.push($(this));
        });

        this.setCheckedHtml();
    },

    /**
     * Sets the display of checked checkboxes amount
     */
    setCheckedHtml: function() {
        'use strict';

        this.$selector_count.html(this.getCheckedCount());

        if (this.getCheckedCount() > 0) {
            this.$selector_checker.filter('.select').hide();
            this.$selector_checker.filter('.unselect').show();
        } else {
            this.$selector_checker.filter('.select').show();
            this.$selector_checker.filter('.unselect').hide();
        }
    },

    /**
     * Checks/Unchecks all checkboxes based on already checked count
     * If > 0 uncheck all otherwise check all
     */
    clickAll: function() {
        'use strict';

        if (this.getCheckedCount() > 0) {
            this.$selector_checkbox.prop('checked', false);
        } else {
            this.$selector_checkbox.prop('checked', true);
        }

        this.setChecked();
    },

    /**
     * Gets a number of checked checkboxes
     *
     * @returns {number}
     */
    getCheckedCount: function() {
        'use strict';

        return this.checked_list.length;
    },

    /**
     * Gets a list of checked checkboxes objects
     *
     * @returns {Array}
     */
    getChecked: function() {
        'use strict';

        return this.checked_list;
    },

    /**
     * Gets a list of checked checkboxes values
     * If separator is defined the list is returned as string with specified separator
     *
     * @param {string} separator
     * @returns {string|Array}
     */
    getCheckedValues: function(separator) {
        'use strict';

        separator = separator || false;
        var values = [];
        var checked_list = this.getChecked();

        for (var i = 0; i < checked_list.length; i++) {
            values.push(checked_list[i].val());
        }

        if (separator) {
            return values.join(separator);
        }

        return values;
    }
};
