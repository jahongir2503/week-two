import { print } from '../print';
import { EButtonUsage } from '../../common/enum';

const main = () => {
    let currentInput: string = '0';
    let currentOperator: EButtonUsage | null = null;
    let previousValue: number | null = null;

    const handleNumber = (number: string) => {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        print(currentInput);
    };

    const handleOperator = (operator: EButtonUsage) => {
        if (currentInput === '0' && operator !== EButtonUsage.OPERATOR_SUBTRACT) {
            return;
        }

        if (currentOperator !== null && previousValue !== null) {
            handleCalculate();
        }

        currentOperator = operator;
        previousValue = parseFloat(currentInput);
        currentInput = '0';
    };

    const handleDecimal = () => {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            print(currentInput);
        }
    };

    const handleClear = (type: EButtonUsage) => {
        if (type === EButtonUsage.OPERATOR_AC) {
            if (currentInput.length > 1) {
                currentInput = currentInput.substring(0, currentInput.length - 1);
            } else {
                currentInput = '0';
            }
            currentOperator = null;
            previousValue = null;
        } else if (type === EButtonUsage.OPERATOR_C) {
            currentInput = '0';
        }
        print(currentInput);
    };

    const handleCalculate = () => {
        const currentValue = parseFloat(currentInput);
        if (previousValue === null || currentOperator === null || isNaN(currentValue)) {
            return;
        }
        try {
            switch (currentOperator) {
                case EButtonUsage.OPERATOR_ADD:
                    currentInput = (previousValue + currentValue).toString();
                    break;
                case EButtonUsage.OPERATOR_SUBTRACT:
                    currentInput = (previousValue - currentValue).toString();
                    break;
                case EButtonUsage.OPERATOR_MULTIPLY:
                    currentInput = (previousValue * currentValue).toString();
                    break;
                case EButtonUsage.OPERATOR_DIVIDE:
                    if (currentValue === 0) {
                        print("Error: Division by zero");
                        return;
                    }
                    currentInput = (previousValue / currentValue).toString();
                    break;
                default:
                    return;
            }
            previousValue = null;
            currentOperator = null;
            print(currentInput);
        } catch (error) {
            print("Error");
        }
    };

    return (state: EButtonUsage | string) => {
        switch (state) {
            case EButtonUsage.BUTTON_0:
            case EButtonUsage.BUTTON_1:
            case EButtonUsage.BUTTON_2:
            case EButtonUsage.BUTTON_3:
            case EButtonUsage.BUTTON_4:
            case EButtonUsage.BUTTON_5:
            case EButtonUsage.BUTTON_6:
            case EButtonUsage.BUTTON_7:
            case EButtonUsage.BUTTON_8:
            case EButtonUsage.BUTTON_9:
                handleNumber(state);
                break;
            case EButtonUsage.OPERATOR_ADD:
            case EButtonUsage.OPERATOR_SUBTRACT:
            case EButtonUsage.OPERATOR_MULTIPLY:
            case EButtonUsage.OPERATOR_DIVIDE:
                handleOperator(state);
                break;
            case EButtonUsage.OPERATOR_DECIMAL:
                handleDecimal();
                break;
            case EButtonUsage.OPERATOR_AC:
            case EButtonUsage.OPERATOR_C:
                handleClear(state);
                break;
            case EButtonUsage.OPERATOR_EQUAL:
                handleCalculate();
                break;
        }
    };
};

export { main };