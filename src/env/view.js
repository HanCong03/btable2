/**
 * @file 提供样式存取服务
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('View', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
        },

        toggleGridLine: function () {
            if (this.gridlineIsVisible()) {
                this.setGridLine(false);
            } else {
                this.setGridLine(true);
            }
        },

        setGridLine: function (state) {
            this.__$api.setGridLine(state);
        },

        toggleRowColHeader: function () {
            if (this.headerIsVisible()) {
                this.setRowColumnHeader(false);
            } else {
                this.setRowColumnHeader(true);
            }
        },

        setRowColumnHeader: function (state) {
            this.__$api.setRowColumnHeader(state);
        },

        setPane: function (start, end) {
            this.__$api.setPane(start, end);
        },

        clearPane: function () {
            this.__$api.clearPane();
        },

        isHideAllRow: function () {
            return this.__$api.isHideAllRow();
        },

        isHideAllColumn: function () {
            return this.__$api.isHideAllColumn();
        },

        gridlineIsVisible: function () {
            return !!this.__$api.getGridLine();
        },

        headerIsVisible: function () {
            return !!this.__$api.getRowColumnHeader();
        },

        getPane: function () {
            return this.__$api.getPane();
        },

        getDefaultColumnWidth: function () {
            return this.__$api.getDefaultColumnWidth();
        },

        getDefaultRowHeight: function () {
            return this.__$api.getDefaultRowHeight();
        },

        setDefaultColumnWidth: function (width) {
            this.__$api.setDefaultColumnWidth(width);
        },

        setDefaultRowHeight: function (height) {
            this.__$api.setDefaultRowHeight(height);
        }
    });
});