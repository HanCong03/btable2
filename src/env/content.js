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
                'reset.content.and.type': this.resetContent,
                'clear.content': this.clearContent,
                'get.content.type': this.getContentType,
                'set.formula': this.setFormula,
                'set.array.formula': this.setArrayFormula,
                'set.range.content': this.setContentForRange
            });
        },

        setContent: function (value, contentType, row, col) {
            this.__$api.setContent(value, contentType, row, col);
        },

        resetContent: function (value, contentType, row, col) {
            this.__$api.resetContent(value, contentType, row, col);
        },

        clearContent: function (start, end) {
            this.__$api.clearContent(start, end);
        },

        getContent: function (row, col) {
            return this.__$api.getContent(row, col);
        },

        getContentInfoByRange: function (start, end) {
            return this.__$api.getContentInfoByRange(start, end);
        },

        getContentType: function (row, col) {
            return this.__$api.getContentType(row, col);
        },

        getContentInfo: function (row, col) {
            return this.__$api.getContentInfo(row, col);
        },

        getFormula: function (row, col) {
            return this.__$api.getFormula(row, col);
        },

        getFormulaType: function (row, col) {
            return this.__$api.getFormulaType(row, col);
        },

        getFormulaInfo: function (row, col) {
            return this.__$api.getFormulaInfo(row, col);
        },

        setFormula: function (formulaText, row, col) {
            this.__$api.setFormula(formulaText, row, col);
        },

        setArrayFormula: function (formulaText, row, col, start, end) {
            this.__$api.setArrayFormula(formulaText, row, col, start, end);
        },

        setContentForRange: function (contents, range) {
            this.__$api.setContentForRange(contents, range);
        }
    });
});