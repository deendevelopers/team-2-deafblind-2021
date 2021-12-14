import { Flex, FormControl, FormLabel, CheckboxGroup, Checkbox } from '@chakra-ui/react';

const CheckBoxInputs = ({ name, groupLabel, checkBoxLabels, handleChange, groupLabelState }) => (
    <FormControl as="fieldset">
        <FormLabel as="legend">{groupLabel}</FormLabel>
        <CheckboxGroup>
            <Flex direction="column">
            {checkBoxLabels.map((type) => (
                <Checkbox 
                    key={type} 
                    id={type}
                    name={name}
                    value={type}
                    isChecked={groupLabelState.includes(type)}
                    onChange={handleChange}
                >
                    {type}
                </Checkbox>
            ))}
            </Flex>
        </CheckboxGroup>
    </FormControl>  
)

export default CheckBoxInputs;