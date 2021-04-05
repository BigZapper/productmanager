import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Select, Form, Input, InputNumber, DatePicker } from 'antd';

function SearchFilter (props)  {
  // constructor(props) {
  //   super(props);
  //   state = {
  //     value: null
  //   };
  // }
  const [value, setValue] =useState(null);
  const handleChange = e => {
    if (props.input === 'select' || props.input === 'currency' || props.input === 'number') {
      setValue(e);
      props.onChange(e, props.name);
    } else if (props.input === 'text') {
      props.onChange(e.target.value, props.name);
    } else {
      props.onChange(e, props.name);
    }
  };
  useEffect(()=>{
    if(props.default !== undefined || props.default !== null){
      console.log(props.default);
      setValue(props.default);
    }
  },[props.default]);

  // componentDidMount() {
  //   if (props.default !== undefined) {
  //     setState({
  //       value: props.default
  //     });
  //   }
  // }
  // render() {
    const gridStyle = {
      boxShadow: 'none',
      padding: 0,
      paddingRight: 20,
      overflow: 'hidden',
      height: 45,
      width: '50%',
      display: props.hidden === true ? 'none' : 'block'
    };
    return (
      <Card.Grid hoverable={false} style={gridStyle}>
        <Row>
          <Col span={8}>
            <Form.Item>
              <span>{props.label}</span>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item>
              {
                props.input === 'select' ?
                  <Select
                    values={value}
                    showSearch
                    placeholder="Search to Select"
                    allowClear
                    onChange={handleChange}
                    disabled={props.mode === 'show'}
                  >
                    {
                      props.values.map((value, key) =>
                        <Select.Option value={value[props.name]} key={key}><span>{value[props.name]}</span></Select.Option>
                      )
                    }
                  </Select>
                  : props.input === 'text' ?
                    <Input value={props.default} onChange={handleChange} disabled={props.mode === 'show'} />
                    : props.input === 'number' ?
                      <InputNumber value={props.default} onChange={handleChange} disabled={props.mode === 'show'} />
                      : props.input === 'currency' ?
                        <InputNumber
                          value={props.default}
                          onChange={handleChange}
                          disabled={props.mode === 'show'}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                        : props.input === 'date' ?
                          <DatePicker.RangePicker onChange={handleChange} disabled={props.mode === 'show'} />
                          : null
              }
            </Form.Item>
          </Col>
        </Row>
      </Card.Grid>
    );
  }
// }
export default SearchFilter;
