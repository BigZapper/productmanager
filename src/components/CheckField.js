import React from 'react';
import { Col, Checkbox } from 'antd';

class CheckField extends React.Component {
  render() {
    return (
      <Col span={12}>
        <Checkbox value={this.props.value} onChange={() => this.props.onCheck(this.props.value)}>{this.props.value}</Checkbox>
      </Col>
    );
  }
}

export default CheckField;
