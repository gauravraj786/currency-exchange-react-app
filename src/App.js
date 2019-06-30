import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import UiAddCurrency from './components/UiAddCurrency';
import UiBody from './components/UiBody';
import UiHeaderInput from './components/UiHeaderInput';
import currList from './utils'
import './App.css';

import {
  Container,
  Button,
  Card, 
  CardHeader,
  CardBody,
} from 'reactstrap';

const currCodes =_.keys(currList);

const copyCodes = [...currCodes];
let usd = _.indexOf(copyCodes, 'USD');
if (usd !== -1) {
  copyCodes.splice(usd, 1);
}

class App extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      basenum: 1,
      selected: ['IDR', 'GBP', 'EUR', 'SGD'],
      rates: {},
      show: false,
      choose: ''
    };
  }
  handleChange = (e) => {
    this.setState({choose: e.target.value});   
  }
  inputChangedHandler = values => {
    this.setState({ basenum: values.value });
  }
  deleteList = (e) => {
    var array = [...this.state.selected]; 
    var index = _.indexOf(array, e.target.value);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({selected: array});
    }
  }
  handleToggleClick = () => {
    this.setState(prevState => ({
      show: !prevState.show
    }));
  }
  handleNew = (e) => {
    e.preventDefault();
    var array = [...this.state.selected];
    array.push(e.target.value);
    array = _.uniq(_.compact(array));
    this.setState({selected: array});
  }
  componentDidMount(){
    axios.get('https://api.exchangeratesapi.io/latest?base=USD')
    .then(response => {
      this.setState({ rates: response.data.rates });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  render() {
    let {base, basenum, rates, selected, show} = this.state;
    basenum = parseFloat(basenum).toFixed(2);
    const chooseList = _.differenceWith(copyCodes, selected, _.isEqual);
    const choose =(this.state.choose ? this.state.choose : chooseList[0]);

    return (
      <div className={'app'}>
        <Container className="pt-4 pb-4">
          <Card>
            <CardHeader>
              {currList.USD.code} - <span className={'font-italic'}>{currList.USD.name}</span>
              <UiHeaderInput 
                basenum={basenum}
                onChange={this.inputChangedHandler} 
              />
            </CardHeader>
            <CardBody>
              {selected.map((code,i ) => {
                let trate = parseFloat(rates[code]).toFixed(2);
                let tratetot = parseFloat(basenum * trate).toFixed(2);
                return(
                  <UiBody 
                    key={i}
                    tcode={code}
                    tratetot={tratetot}
                    base={base}
                    trate={trate}
                    onClick={this.deleteList}
                  />
                )
              }, this)}
              <div>
                {
                  show && 
                  <UiAddCurrency 
                    show={show}
                    choose={choose}
                    chooseList={chooseList}
                    onChange={this.handleChange}
                    onClick={this.handleNew}
                  />
                }
                <Button color={show ? 'warning' : 'secondary'} className="addBtn" onClick={this.handleToggleClick}>
                  {`${show ? '(x) Cancel Adding' : '(+) Add More '} Currency`}
                </Button>                
              </div>

            </CardBody>
          </Card>
      </Container>
    </div>
    )
  }
}

export default App;
