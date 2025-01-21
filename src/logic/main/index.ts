import {print} from '../print'
import {EButtonUsage} from "../../common/enum";

const main = () => {
    let result = 0
    let currentValue:string = ''

    return (state: EButtonUsage) => {

        //Логика прописки цыфор и операторов
        if(
            state === EButtonUsage.BUTTON_0 ||
            state === EButtonUsage.BUTTON_1 ||
            state === EButtonUsage.BUTTON_2 ||
            state === EButtonUsage.BUTTON_3 ||
            state === EButtonUsage.BUTTON_4 ||
            state === EButtonUsage.BUTTON_5 ||
            state === EButtonUsage.BUTTON_6 ||
            state === EButtonUsage.BUTTON_7 ||
            state === EButtonUsage.BUTTON_8 ||
            state === EButtonUsage.BUTTON_9 ||
            state === EButtonUsage.OPERATOR_ADD ||
            state === EButtonUsage.OPERATOR_SUBTRACT ||
            state === EButtonUsage.OPERATOR_MULTIPLY ||
            state === EButtonUsage.OPERATOR_DIVIDE
        ){
            if (currentValue === "0") {
                currentValue = state;
            } else {
                currentValue += state;
            }
        }

//Логика удаления значений  AC
        if(state === EButtonUsage.OPERATOR_AC){
            currentValue = currentValue.substring(0, currentValue.length - 1);
        }
//Логика удаления значений C
        if(state === EButtonUsage.OPERATOR_C){
            currentValue = currentValue = '';
        }
        if(currentValue.length === 0){currentValue = '0'}
//
        if(state === EButtonUsage.OPERATOR_EQUAL){currentValue = eval(currentValue)}


        print(currentValue)
        return
    }
}

export {main}
