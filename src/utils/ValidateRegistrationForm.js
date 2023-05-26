import { EMAIL, MULTIPLE_CHOICE, SINGLE_CHOICE } from "./RegistrationFormInputs"

export default function validateRegistrationForm(inputs) {
    let isEmailDefined = false
    let names = {}
    for(const i in inputs) {
        const input = inputs[i]

        if(names[input.question]) {
            return "All input questions need to be unique"
        } else {
            names[input.question] = true
        }

        if (input.type === EMAIL) {
            if (isEmailDefined) {
                return "Exactly one email field needs to be defined!"
            } else {
                isEmailDefined = true
            }
        }

        if (!input.question) {
            return "Question for an input cannot be empty!"
        }

        if (input.type === SINGLE_CHOICE || input.type === MULTIPLE_CHOICE) {
            if(input.options.length < 1) {
                return "Multiple choice and Single choice inputs need to have at least one option!"
            }
            let optionNames = {}

            for(const j in input.options){
                const option = input.options[j]
                if(!option) {
                    return "All defined options for multiple choice or single choice questions need to have a name!"
                }
                if(optionNames[option]) {
                    return "All option must have different names within one input"
                } else {
                    optionNames[option] = true
                }
            }
        }
    }

    if (!isEmailDefined) {
        return "Exactly one email field needs to be defined!"
    }
}