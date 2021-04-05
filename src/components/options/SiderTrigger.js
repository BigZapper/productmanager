import React from 'react';
import {DoubleRightOutlined, DoubleLeftOutlined} from '@ant-design/icons';

function SiderTrigger(props) {
  return (
    <div>
      {
        props.isCollapsed ? <DoubleRightOutlined />: <DoubleLeftOutlined/>
      }
    </div>
  );
}

export default SiderTrigger;
