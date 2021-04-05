import React from 'react';
import { Row, Col, Checkbox } from 'antd';
import CheckField from './CheckField';

function DisplaySearchField(props) {
  return (
    <div className="display-search-field" style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #e8e8e8' }}>
      <Row>
        <Col>
          <div style={{ fontWeight: 'bold', fontSize: 15 }}>Chọn hiển thị điều kiện tìm kiếm</div>
          <Checkbox.Group defaultValue={props.checkedList}>
            <Row>
              {
                props.fields.map(field =>
                  <CheckField key={field} value={field} onCheck={props.onCheck}/>
                )}
            </Row>
          </Checkbox.Group>
        </Col>
      </Row>
    </div>
  );
}

export default DisplaySearchField;
