/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    module.exports = {
        env: {
            standard: require('./env/commands/standard'),
            theme: require('./env/commands/theme'),
            style: require('./env/commands/style'),
            userStyle: require('./env/commands/user-style'),
            typeStyle: require('./env/commands/type-style'),
            border: require('./env/commands/border'),
            clear: require('./env/commands/clear'),
            comment: require('./env/commands/comment'),
            dimension: require('./env/commands/dimension'),
            mergeCell: require('./env/commands/merge-cell'),
            rowColumn: require('./env/commands/row-column'),
            view: require('./env/commands/view'),
            content: require('./env/commands/content')
        },
        core: {
            content: require('./core/commands/cell/content'),
            columnWidth: require('./core/commands/column-width'),
            rowHeight: require('./core/commands/row-height'),
            scroll: require('./core/commands/scroll'),
            selection: require('./core/commands/selection')
        },
        system: {},
        ext: {}
    };
});