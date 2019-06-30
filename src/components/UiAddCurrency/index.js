import React from 'react';
import {
    Button,
    InputGroup, 
    InputGroupAddon
  } from 'reactstrap';
import '../../App.css'

const UiAddCurrency = props =>{
    let {show, choose, chooseList, onChange, onClick} = props;
    return (
        <InputGroup className="flex" color={show ? 'warning' : 'secondary'}>
            <select className="addCurrencySelect" onChange={onChange}>
                {chooseList.map(function(code, i){
                return <option value={code} key={code}>{code}</option>
                })}
            </select>
            <InputGroupAddon addonType="append">
                <Button onClick={onClick} value={choose} >submit</Button>
            </InputGroupAddon>                
        </InputGroup>
    )
}
export default UiAddCurrency;