/**
 * @file
 * @author hancong03@baiud.com
 */

define(function (require, exports, module) {
    var ERROR_TYPE = require('definition/error-type');
    var OPERAND_TYPE = require('../../../../definition/operand-type');
    var FrameCalculator = require('./frame-calculator');

    module.exports = {
        exec: function (reader, op, args) {
            return calcute(reader, op, args);
        }
    };

    function calcute(reader, op, operands) {
        var current;
        var result = [];

        // 参数类型验证
        for (var i = 0, len = operands.length; i < len; i++) {
            current = operands[i];

            switch (current.type) {
                case OPERAND_TYPE.UNION:
                    return {
                        type: OPERAND_TYPE.ERROR,
                        value: ERROR_TYPE.VALUE
                    };

                case OPERAND_TYPE.RANGE:
                    result.push(loadRange(reader, current));
                    break;

                case OPERAND_TYPE.ARRAY:
                    result.push(current);
                    break;

                case OPERAND_TYPE.ERROR:
                    return current;

                case OPERAND_TYPE.CELL:
                    result.push(loadCell(reader, current));
                    break;

                default:
                    result.push(current);
                    break;
            }
        }

        return FrameCalculator.run(op, result);
    }

    function loadCell(reader, operand) {
        var result = reader.getValue(operand.value.row, operand.value.col);

        if (result) {
            return result;
        }

        return {
            type: OPERAND_TYPE.NUMBER,
            value: '0'
        };
    }

    function loadRange(reader, operand) {
        return reader.getValues(operand.value.row, operand.value.col);
    }
});