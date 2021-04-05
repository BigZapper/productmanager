import React from 'react';
import SortField from './SortField';
import DisplaySearchField from './DisplaySearchField';
import DisplayResult from './DisplayResult';

class Display extends React.Component {
  render(){
  return (
    <div>
      <SortField fields={this.props.fields}/>
      <DisplaySearchField fields={this.props.fields} onCheck={this.props.onCheck} checkedList={this.props.checkedList}/>
      <DisplayResult fields={this.props.fieldRes} onCheckResult={this.props.onCheckResult} checkedList={this.props.checkedResultList}/>
    </div>
  );
}
}
export default Display;
