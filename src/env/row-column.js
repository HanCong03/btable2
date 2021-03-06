/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('RowColumn', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'get.row.height': this.getRowHeight,
                'get.column.width': this.getColumnWidth,

                'set.row.height': this.setRowHeight,
                'set.bestfit.row.height': this.setBestFitRowHeight,
                'set.column.width': this.setColumnWidth,
                'set.bestfit.column.width': this.setBestFitColumnWidth
            });
        },

        setRowHeight: function (height, startIndex, endIndex) {
            this.__$api.setRowHeight(height, startIndex, endIndex);
        },

        setBestFitRowHeight: function (height, row) {
            this.__$api.setBestFitRowHeight(height, row);
        },

        setColumnWidth: function (width, startIndex, endIndex) {
            this.__$api.setColumnWidth(width, startIndex, endIndex);
        },

        setBestFitColumnWidth: function (width, col) {
            this.__$api.setBestFitColumnWidth(width, col);
        },

        isBestFitColumnWidth: function (col) {
            return this.__$api.isBestFitColumnWidth(col);
        },

        isBestFitRowHeight: function (row) {
            return this.__$api.isBestFitRowHeight(row);
        },

        removeColumnWidth: function (col) {
            this.__$api.removeColumnWidth(col);
        },

        removeRowHeight: function (row) {
            this.__$api.removeRowHeight(row);
        },

        getRowHeight: function (row) {
            return this.__$api.getRowHeight(row);
        },

        getColumnWidth: function (col) {
            return this.__$api.getColumnWidth(col);
        },

        hideRow: function (startIndex, endIndex) {
            this.__$api.hideRow(startIndex, endIndex);
        },

        hideColumn: function (startIndex, endIndex) {
            this.__$api.hideColumn(startIndex, endIndex);
        },

        showRow: function (startIndex, endIndex) {
            this.__$api.showRow(startIndex, endIndex);
        },

        showColumn: function (startIndex, endIndex) {
            this.__$api.showColumn(startIndex, endIndex);
        },

        isHiddenRow: function (row) {
            return this.__$api.isHiddenRow(row);
        },

        isHiddenColumn: function (col) {
            return this.__$api.isHiddenColumn(col);
        }
    });
});