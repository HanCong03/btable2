/**
 * @file 格式化内容管理模块
 * 提供对单元格内容的格式化管理
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var $$ = require('utils');
    var CacheCleaner = require('common/cache-cleaner');
    var VALUE_TYPE = require('definition/vtype');

    module.exports = $$.createClass('FormattedContent', {
        base: require('module'),

        init: function () {
            this.__initService();
            this.__initEvent();
        },

        __initHeap: function () {
            var heap = this.getActiveHeap();

            if ($$.isNdef(heap.contents)) {
                heap.contents = [];
            }
        },

        __initService: function () {
            this.registerService({
                'get.formatted.content': this.getFormattedContent,
                'get.formatted.type': this.getFormattedType,
                'get.formatted.color': this.getFormattedColor,
                'get.formatted.info': this.getFormattedInfo,
                'get.standard.formatted.content': this.getStandardFormattedContent,
                'get.effective.formatted.content': this.getEffectiveFormattedContent
            });
        },

        __initEvent: function () {
            this.on({
                'contentchange': this.onContentChange,
                'stylechange': this.onStyleChange,
                'sheetswitch': this.__onSheetSwitch,
                'dataready': this.__onDataReady
            });
        },

        __onDataReady: function () {
            this.__initHeap();
        },

        __onSheetSwitch: function () {
            this.__initHeap();
        },

        onContentChange: function (start, end) {
            var heap = this.getActiveHeap();
            heap.contents = CacheCleaner.clean(heap.contents, start, end);
        },

        onStyleChange: function (start, end) {
            this.onContentChange(start, end);
        },

        getFormattedContent: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.text;
        },

        /**
         * 获取到的内容不包含repeat格式串
         * @param row
         * @param col
         * @returns {null}
         */
        getEffectiveFormattedContent: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            var content = data.text;
            var result = [];
            var current;
            var type;

            for (var i = 0, len = content.length; i < len; i++) {
                current = content[i];
                type = current.type;

                if (type === 'repeat') {
                    continue;
                } else if (type === 'placeholder') {
                    result.push(current.value);
                } else {
                    result.push(current);
                }
            }

            return result.join('').split('\n');
        },

        getFormattedColor: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.color;
        },

        getFormattedType: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.type;
        },

        getFormattedInfo: function (row, col) {
            return this.__getData(row, col);
        },

        getStandardFormattedContent: function (row, col) {
            var data = this.__getData(row, col);

            if (!data) {
                return null;
            }

            return data.standard;
        },

        __getData: function (row, col) {
            var heap = this.getActiveHeap();
            var contents = heap.contents;
            var result;

            // 需要区别null
            // undefined 代表未初始化
            // null 代表空
            if (contents[row] === undefined) {
                contents[row] = [];
            }

            if (contents[row][col] === undefined) {
                result = this.__loadCell(row, col);

                if (result) {
                    result.horizontal = this.__getHorizontal(result.type);
                }

                contents[row][col] = result;
            }

            return contents[row][col];
        },

        __loadCell: function (row, col) {
            var contentInfo = this.queryCommandValue('contentinfo', row, col);

            if ($$.isNdef(contentInfo)) {
                return null;
            }

            var numfmt = this.queryCommandValue('numfmt', row, col);
            var result = this.rs('numfmt.format', contentInfo.type, contentInfo.value, numfmt);

            // 显示在输入框内的内容
            result.showText = result.standard;

            var formulaInfo = this.queryCommandValue('formulainfo', row, col);

            if (formulaInfo === null) {
                return result;
            }

            result.standard = formulaInfo.value;

            if (formulaInfo.type === 'array') {
                result.showText = '{' + result.standard + '}';
            } else {
                result.showText = result.standard;
            }

            return result;
        },

        __getHorizontal: function (type) {
            switch (type) {
                case VALUE_TYPE.NUMBER:
                    return 'right';

                case VALUE_TYPE.TEXT:
                    return 'left';

                case VALUE_TYPE.ERROR:
                case VALUE_TYPE.LOGICAL:
                    return 'center';
            }
        }
    });
});