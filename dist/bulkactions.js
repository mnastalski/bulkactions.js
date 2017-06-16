/*!
 * Bulkactions.js v1.0.1 (https://github.com/mnastalski/bulkaction.js)
 * Copyright 2017 Mateusz Nastalski
 * Licensed under MIT
 */

var BulkActions = {
    checked_list: [],

    $selector_checkboxes: undefined,
    $selector_checker: undefined,
    $selector_count: undefined,

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

    bindCheckbox: function(selector) {
        'use strict';

        this.$selector_checkboxes = $(selector);

        this.bindShiftSelectable();

        this.$selector_checkboxes.on('change', function () {
            BulkActions.setChecked();
        });
    },

    bindCount: function(selector) {
        'use strict';

        this.$selector_count = $(selector);

        this.$selector_count.on('click', function (e) {
            e.preventDefault();
        });
    },

    bindChecker: function(selector) {
        'use strict';

        this.$selector_checker = $(selector);

        this.$selector_checker.on('click', function (e) {
            e.preventDefault();

            BulkActions.clickAll();
        });
    },

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

    setChecked: function() {
        'use strict';

        this.checked_list = [];

        this.$selector_checkboxes.filter(':checked').each(function () {
            BulkActions.checked_list.push($(this));
        });

        this.setHtml();
    },

    setHtml: function() {
        'use strict';

        this.setCountHtml();
        this.setCheckerHtml();
    },

    setCountHtml: function() {
        'use strict';

        if (typeof this.$selector_count === 'undefined') {
            return;
        }

        this.$selector_count.html(this.getCheckedCount());
    },

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

    clickAll: function() {
        'use strict';

        if (this.getCheckedCount() > 0) {
            this.uncheckAll();
        } else {
            this.checkAll();
        }
    },

    checkAll: function() {
        'use strict';

        this.$selector_checkboxes.prop('checked', true);

        this.setChecked();
    },

    uncheckAll: function() {
        'use strict';

        this.$selector_checkboxes.prop('checked', false);

        this.setChecked();
    },

    getChecked: function() {
        'use strict';

        return this.checked_list;
    },

    getCheckedCount: function() {
        'use strict';

        return this.getChecked().length;
    },

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
