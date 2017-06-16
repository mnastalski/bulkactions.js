/*!
 * Bulkactions.js v1.0.1 (https://github.com/mnastalski/bulkaction.js)
 * Copyright 2017 Mateusz Nastalski
 * Licensed under MIT
 */

var BulkActions = {
    /**
     * List of checked checkboxes
     */
    checked_list: [],

    /**
     * Selectors
     */
    $selector_checkboxes: undefined,
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

        this.bindCheckbox(options.checkboxes || 'input[type="checkbox"]');

        if (typeof options.count !== 'undefined') {
            this.bindCount(options.count);
        }

        if (typeof options.checker !== 'undefined') {
            this.bindChecker(options.checker);
        }

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

        this.$selector_checkboxes = $(selector);

        this.bindShiftSelectable();

        this.$selector_checkboxes.on('change', function () {
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

        this.$selector_checkboxes.on('click', function (e) {
            if (!lastChecked) {
                lastChecked = this;
                return;
            }

            if (e.shiftKey) {
                var start = BulkActions.$selector_checkboxes.index(this),
                    end = BulkActions.$selector_checkboxes.index(lastChecked);

                BulkActions.$selector_checkboxes.slice(Math.min(start, end), Math.max(start, end) + 1)
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

        this.$selector_checkboxes.filter(':checked').each(function () {
            BulkActions.checked_list.push($(this));
        });

        this.setHtml();
    },

    /**
     * Sets the display of html elements
     */
    setHtml: function() {
        'use strict';

        this.setCountHtml();
        this.setCheckerHtml();
    },

    /**
     * Sets the display of checked checkboxes amount if it is bound
     */
    setCountHtml: function() {
        'use strict';

        if (typeof this.$selector_count === 'undefined') {
            return;
        }

        this.$selector_count.html(this.getCheckedCount());
    },

    /**
     * Sets the display of check-all buttons if they are bound
     */
    setCheckerHtml: function() {
        'use strict';

        if (typeof this.$selector_checker === 'undefined') {
            return;
        }

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
            this.uncheckAll();
        } else {
            this.checkAll();
        }
    },

    /**
     * Checks all checkboxes
     */
    checkAll: function() {
        'use strict';

        this.$selector_checkboxes.prop('checked', true);

        this.setChecked();
    },

    /**
     * Unchecks all checkboxes
     */
    uncheckAll: function() {
        'use strict';

        this.$selector_checkboxes.prop('checked', false);

        this.setChecked();
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
     * Gets the number of checked checkboxes
     *
     * @returns {number}
     */
    getCheckedCount: function() {
        'use strict';

        return this.getChecked().length;
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
