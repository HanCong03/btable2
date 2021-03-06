/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var STATUS = require('../definition/status');
    var KEY_CODE = require('system/definition/key-code');

    module.exports = {
        timer: null,

        __onkeydown: function (evt) {
            if (this.status !== STATUS.NORMAL) {
                // 终止所有操作
                this.__abort();
            }

            if (evt.ctrlKey || evt.metaKey) {
                switch (evt.keyCode) {
                    // CTRL + A
                    case 65:
                        this.execCommand('selectall');
                        return;

                    // CTRL + C
                    case 67:
                        this.__doCopy();
                        return;
                }
            }

            if (evt.keyCode === 65 && (evt.ctrlKey || evt.metaKey)) {
                this.execCommand('selectall');
                return;
            }

            switch (evt.keyCode) {
                case KEY_CODE.LEFT:
                    this.__keyLeft(evt);
                    break;

                case KEY_CODE.UP:
                    this.__keyUp(evt);
                    break;

                case KEY_CODE.RIGHT:
                    this.__keyRight(evt);
                    break;

                case KEY_CODE.DOWN:
                    this.__keyDown(evt);
                    break;

                case KEY_CODE.ENTER:
                    this.__keyEnter(evt);
                    break;

                case KEY_CODE.TAB:
                    this.__keyTab(evt);
                    break;

                case KEY_CODE.DELETE:
                    this.__keyDelete(evt);
                    break;
            }
        },

        __keyLeft: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('left', evt.originalEvent.timeStamp)) {
                return;
            }

            if (evt.shiftKey) {
                this.__shiftLeft(evt);
            } else {
                // move
                this.execCommand('move', 0, -1);
            }
        },

        __keyUp: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('up', evt.originalEvent.timeStamp)) {
                return;
            }

            if (evt.shiftKey) {
                this.__shiftTop(evt);
            } else {
                // move
                this.execCommand('move', -1, 0);
            }
        },

        __keyRight: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('right', evt.originalEvent.timeStamp)) {
                return;
            }

            if (evt.shiftKey) {
                this.__shiftRight(evt);
            } else {
                // move
                this.execCommand('move', 0, 1);
            }
        },

        __keyDown: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('down', evt.originalEvent.timeStamp)) {
                return;
            }

            if (evt.shiftKey) {
                this.__shiftDown(evt);
            } else {
                // move
                this.execCommand('move', 1, 0);
            }
        },

        __keyDelete: function (evt) {
            evt.preventDefault();

            if (!this.__checkRecord('delete', evt.originalEvent.timeStamp)) {
                return;
            }

            var range = this.queryCommandValue('range');

            if (!this.execCommand('clearcontent', range.start, range.end)) {
                this.error('array.formula');
            }
        },

        __doCopy: function () {
            var range = this.queryCommandValue('range');
            //this.execCommand('copy', range.start, range.end);
        },

        __abortKey: function () {}
    };
});