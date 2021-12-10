import React from "react";
import { Flex, FormControl, FormLabel, RadioGroup, Radio } from '@chakra-ui/react';

const RadioInputs = ({ groupLabel, radioLabels, setter, groupLabelState }) => (
    <FormControl as="fieldset">
        <FormLabel as="legend">{groupLabel}</FormLabel>
        <RadioGroup>
            <Flex direction="column">
            {radioLabels.map((type) => (
                <Radio 
                    key={type} 
                    id={type}
                    name={type}
                    value={type}
                    isChecked={groupLabelState === type}
                    onChange={() => setter(type)}
                >
                    {type}
                </Radio>
            ))}
            </Flex>
        </RadioGroup>
    </FormControl>  
)

export default RadioInputs;