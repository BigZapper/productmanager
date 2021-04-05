import React from 'react';
import { Form, Collapse, Card } from 'antd';
import SearchFilter from './SearchFilter';

function unique(array, val) {
  const flags = [], output = [], l = array.length;
  for (let i = 0; i < l; i++) {
    if (flags[array[i][val]]) {
      continue
    }
    flags[array[i][val]] = true;
    output.push(array[i]);
  }
  return output;
}
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const bandA = a.productId.toUpperCase();
  const bandB = b.productId.toUpperCase();

  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else {
    comparison = -1;
  }
  return comparison;
}
const { Panel } = Collapse;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 }
};
const creators = [
  {id: '001', creator: 'Đình Phú'},
  {id: '002', creator: 'Tuấn'}
];
const updators = [
  {id: '001', updator: 'Đình Phú'},
  {id: '002', updator: 'Tuấn'}
];
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      groups: [],
      units: [],
      providers: [],
      status: [],
      creators:[],
      updators: []
    };
  }
  componentDidMount(){
    this.setState({
      types: unique(this.props.products, 'productType'),
      groups: unique(this.props.products, 'productGroup'),
      units: unique(this.props.products, 'unit'),
      providers: unique(this.props.products, 'provider'),
      status: unique(this.props.products, 'status')
    });
  }
  render(){
    return (
      <div className='container'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          {...layout}
        >
          <Collapse defaultActiveKey={['1']} expandIconPosition='right'>
            <Panel className='search-title' header="Thông tin tìm kiếm" key="1">
              <Card bordered={false}>
                <SearchFilter onChange={this.props.handleChange} values={this.state.types.sort()} label='Loại sản phẩm' input='select' name='productType' hidden={!this.props.showField.includes('Loại sản phẩm')} />
                <SearchFilter onChange={this.props.handleChange} values={this.state.groups} label='Nhóm sản phẩm' input='select' name='productGroup' hidden={!this.props.showField.includes('Nhóm sản phẩm')} />
                <SearchFilter onChange={this.props.handleChange} values={this.props.products.sort(compare)} label='Mã sản phẩm' input='select' name='productId' hidden={!this.props.showField.includes('Mã sản phẩm')} />
                <SearchFilter onChange={this.props.handleChange} values={this.props.products} label='Tên sản phẩm' input='select' name='productName' hidden={!this.props.showField.includes('Tên sản phẩm')} />
                <SearchFilter onChange={this.props.handleChange} label='Mã barcode' input='text' name='barcode' hidden={!this.props.showField.includes('Mã barcode')} />
                <SearchFilter onChange={this.props.handleChange} values={this.state.units} label='Đơn vị tính' input='select' name='unit' hidden={!this.props.showField.includes('Đơn vị tính')} />
                <SearchFilter onChange={this.props.handleChange} values={this.state.providers} label='Nhà cung cấp' input='select' name='provider' hidden={!this.props.showField.includes('Nhà cung cấp')} />
                <SearchFilter onChange={this.props.handleChange} label='Tồn kho tối thiểu' input='number' name='inventoryLeast' hidden={!this.props.showField.includes('Tồn kho tối thiểu')} />
                <SearchFilter onChange={this.props.handleChange} label='Kích thước' input='text' name='size' hidden={!this.props.showField.includes('Kích thước')} />
                <SearchFilter onChange={this.props.handleChange} label='Nguồn gốc' input='text' name='source' hidden={!this.props.showField.includes('Nguồn gốc')} />
                <SearchFilter onChange={this.props.handleChange} label='Giá bán' input='currency' name='price' hidden={!this.props.showField.includes('Giá bán')} />
                <SearchFilter onChange={this.props.handleChange} label='Giá vốn' input='currency' name='costPrice' hidden={!this.props.showField.includes('Giá vốn')} />
                <SearchFilter onChange={this.props.handleChange} label='Mô tả' input='text' name='description' hidden={!this.props.showField.includes('Mô tả')} />
                <SearchFilter onChange={this.props.handleChange} values={this.state.status} label='Trạng thái' input='select' name='status' hidden={!this.props.showField.includes('Trạng thái')} />
                <SearchFilter onChange={this.props.handleChange} values={creators} label='Người tạo' input='select' name='creator' hidden={!this.props.showField.includes('Người tạo')} />
                <SearchFilter onChange={this.props.handleChange} label='Ngày tạo' input='date' name='createdDate' hidden={!this.props.showField.includes('Ngày tạo')} />
                <SearchFilter onChange={this.props.handleChange} values={updators} label='Người cập nhật' input='select' name='updator' hidden={!this.props.showField.includes('Người cập nhật')} />
                <SearchFilter onChange={this.props.handleChange} label='Ngày cập nhật' input='date' name='updatedDate' hidden={!this.props.showField.includes('Ngày cập nhật')} />
              </Card>
            </Panel>
          </Collapse>
        </Form>
      </div>
    );
  }
}

export default SearchForm;
