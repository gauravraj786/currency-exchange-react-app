import React from 'react';
import NumberFormat from 'react-number-format';
import {
    InputGroup, 
    InputGroupAddon
  } from 'reactstrap';
import currList from '../../utils'
import '../../App.css'

const UiHeaderInput = props =>{
    let {basenum, onChange} = props;
    return (
        <InputGroup className="mt-4 headerInput">
            <InputGroupAddon addonType="prepend">{currList.USD.code}</InputGroupAddon>
            <NumberFormat 
                className="text-right pr-2" 
                style={{width:'50%'}} 
                thousandSeparator={true} prefix={''} 
                fixedDecimalScale={true} decimalSeparator={'.'} 
                decimalScale={2} value={basenum} 
                onValueChange={onChange} 
            />
        </InputGroup>
    )
}
export default UiHeaderInput;