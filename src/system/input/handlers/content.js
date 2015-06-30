/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var GRIDLINE_CONFIG = require('definition/gridline');
    var OFFSET = GRIDLINE_CONFIG.offset;
    var LINE_WIDTH = GRIDLINE_CONFIG.width;

    module.exports = {
        __syncContent: function () {
            var row = this.__cellStart.row;
            var col = this.__cellStart.col;

            var formattedContent = this.rs('get.formatted.content', row, col);

            if (!formattedContent) {
                return;
            }

            this.inputNode.innerHTML = formattedContent.replace(/\n/g, '<br/>\uFEFF');

            // 根据内容获取大小
            var rect = this.__calculateContentRect(formattedContent);

            this.__relocation(rect);
        },

        __resetUserContent: function () {
            this.inputNode.innerHTML = '';
        },

        __getUserContent: function () {
            var content = this.inputNode.innerHTML;

            // 格式化
            return content.replace(/<br\s*\/?>/g, '\n')
                        .replace(/[\uFEFF]/g, '')
                        .replace(/<[^>]+?>/g, '');
        }
    };
});