import React from 'react';
import { Row, Col, Form, Select } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

function SortField(props) {
  return (
    <div className="sort-field" style={{marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #e8e8e8'}}>
      <Row>
        <Col>
          <Form>
            <Form.Item
            >
              <span style={{ fontWeight: 'bold', fontSize: 15 }}>Sắp xếp hiển thị <SortDescendingOutlined /></span>
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={[props.fields[3]]}
              >
                {props.fields}
              </Select>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default SortField;
