/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Content', {
        base: require('env-module'),

        init: function () {
            this.__$api = this.getAPI();
            this.__initService();
        },

        __initService: function () {
            this.registerService({
                'set.content.and.type': this.setContent,
                'clear.content': this.clearContent,
                'get.content.type': this.getContentType
            });
        },

        setContent: function (value, contentType, row, col) {
            this.__$api.setContent(value, contentType, row, col);
        },

        clearContent: function (start, end) {
            this.__$api.clearContent(start, end);
        },

        getContent: function (row, col) {
            return this.__$api.getContent(row, col);
        },

        getContentType: function (row, col) {
            return this.__$api.getContentType(row, col);
        },

        getContentInfo: function (row, col) {
            return this.__$api.getContentInfo(row, col);
        }
    });
});