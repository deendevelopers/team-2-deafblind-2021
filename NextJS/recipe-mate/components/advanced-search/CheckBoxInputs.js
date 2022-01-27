import { Flex, FormControl, FormLabel, CheckboxGroup, Checkbox, Text } from '@chakra-ui/react';

const CheckBoxInputs = ({ name, groupLabel, checkBoxLabels, handleChange, groupLabelState }) => (
    <FormControl as="fieldset" width="fit-content">
        <FormLabel as="legend">{groupLabel}</FormLabel>
        <CheckboxGroup value={groupLabelState}>
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
                    <Text as="span" textTransform="capitalize">{type}</Text>
                </Checkbox>
            ))}
            </Flex>
        </CheckboxGroup>
    </FormControl>  
)

export default CheckBoxInputs;