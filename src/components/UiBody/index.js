import React from 'react';
import NumberFormat from 'react-number-format';
import {
    Col,
    Button,
    Table,
    Card, 
    CardText, 
    CardTitle, 
    CardSubtitle
  } from 'reactstrap';
import currList from '../../utils'
import '../../App.css'

const UiBody = props =>{
    let {tcode, tratetot, base, trate, onClick} = props;
    return (
        <Table bordered>
            <tbody>
                <tr>
                    <td style={{width:'80%'}}>
                        <Card className="border-0">
                          <CardTitle className="row pb-1">
                            <Col sm={2} xs={4}>{tcode}</Col>
                            <Col sm={10} xs={8} className="text-right">
                              <NumberFormat 
                                value={tratetot} 
                                thousandSeparator={','} 
                                displayType={'text'}  
                                prefix={''} 
                                fixedDecimalScale={true} 
                                decimalSeparator={'.'} 
                                decimalScale={2} 
                              />
                            </Col>
                          </CardTitle>
                          <CardSubtitle className="small font-weight-bold">
                            {currList[tcode].code} - <span className={'font-italic'}>{currList[tcode].name}</span>
                          </CardSubtitle>
                          <CardText className="small font-italic">
                            {'1'} {base} = {tcode} 
                            <NumberFormat 
                                value={trate} 
                                thousandSeparator={','} 
                                displayType={'text'}  
                                prefix={''} 
                                fixedDecimalScale={true} 
                                decimalSeparator={'.'} 
                                decimalScale={2} 
                            />
                          </CardText>
                        </Card>
                    </td>
                    <td className="text-center" style={{width:'10%', verticalAlign:'middle'}}>
                        <Button onClick={onClick} value={tcode}>-</Button>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}
export default UiBody;