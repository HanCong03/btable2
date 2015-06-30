/**
 * @file 渲染画布对象
 * @author hancong03@baiud.com
 */


define(function (require, exports, module) {
    var $$ = require('utils');

    module.exports = $$.createClass('Mask', {
        base: require('component'),

        // 监听器
        listener: function () {},

        init: function () {
            this.maskNode = this.__createMaskNode();
            this.__initDomEvent();
        },

        appendTo: function (container) {
            this.container = container;
            container.appendChild(this.maskNode);
        },

        addInput: function (inputNode) {
            var _self = this;

            this.inputNode = inputNode;

            $(this.inputNode).on('keydown', function (evt) {
                evt.stopPropagation();

                _self.listener(evt.type, evt);
            });
        },

        setListener: function (listener) {
            this.listener = listener;
        },

        __initDomEvent: function () {
            var _self = this;

            $(this.maskNode).on('mousedown mousemove mouseup mouseleave mouseenter', function (evt) {
                evt.stopPropagation();
                evt.preventDefault();

                _self.listener(evt.type, evt);
            });
        },

        __createMaskNode: function () {
            var node = document.createElement('div');
            node.className = 'btb-mask';

            return node;
        }
    });
});