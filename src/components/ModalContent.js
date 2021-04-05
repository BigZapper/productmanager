import { Tabs, Card, Drawer } from 'antd';
import Form from 'antd/lib/form/Form';
import React from 'react';
import DisplaySearchField from './DisplaySearchField';
import SearchFilter from './SearchFilter';
import { SettingOutlined } from '@ant-design/icons';

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
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 24 }
};
const creators = [
  { id: '001', creator: 'Đình Phú' },
  { id: '002', creator: 'Tuấn' }
];
const updators = [
  { id: '001', updator: 'Đình Phú' },
  { id: '002', updator: 'Tuấn' }
];
class ModalContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      groups: [],
      units: [],
      providers: [],
      status: [],
      creators: [],
      updators: [],
      visible: false,
      form: null,
      mode:'',
      selected: null
    };
  }
  componentDidMount() {
    this.setState({mode: this.props.mode});
    this.setState({
      types: unique(this.props.products, 'productType'),
      groups: unique(this.props.products, 'productGroup'),
      units: unique(this.props.products, 'unit'),
      providers: unique(this.props.products, 'provider'),
      status: unique(this.props.products, 'status'),
      selected: this.props.selected[0]
    });
    if(this.props.mode === 'copy' || this.props.mode === 'show' || this.props.mode === 'edit'){
      this.setState({
        form: this.props.selected[0]
      });
    } else{
      this.setState({
        form: null
      });
    }
  }

  handleChange = (val, key) => {
    this.setState({
      form: {
        ...this.state.form,
        [key]:val
      }
    });
  };

  render() {
    return (
      <Form>
      <SettingOutlined style={{ float: 'right', margin: 7, fontSize: 25, color: 'seagreen', cursor: 'pointer' }} onClick={() => this.setState({visible:true})} />
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab='Thông tin chung' key='1'>
            <Card>
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].productType} onChange={this.props.handleChange} values={this.state.types.sort()} label='Loại sản phẩm' input='select' name='productType' hidden={!this.props.checkedList.includes('Loại sản phẩm')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].productGroup} onChange={this.props.handleChange} values={this.state.groups} label='Nhóm sản phẩm' input='select' name='productGroup' hidden={!this.props.checkedList.includes('Nhóm sản phẩm')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].productId} onChange={this.props.handleChange} label='Mã sản phẩm' input='text' name='productId' hidden={!this.props.checkedList.includes('Mã sản phẩm')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].productName} onChange={this.props.handleChange} label='Tên sản phẩm' input='text' name='productName' hidden={!this.props.checkedList.includes('Tên sản phẩm')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].barcode} onChange={this.props.handleChange} label='Mã barcode' input='text' name='barcode' hidden={!this.props.checkedList.includes('Mã barcode')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].unit} onChange={this.props.handleChange} values={this.state.units} label='Đơn vị tính' input='select' name='unit' hidden={!this.props.checkedList.includes('Đơn vị tính')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].provider} onChange={this.props.handleChange} values={this.state.providers} label='Nhà cung cấp' input='select' name='provider' hidden={!this.props.checkedList.includes('Nhà cung cấp')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].inventorLeast} onChange={this.props.handleChange} label='Tồn kho tối thiểu' input='number' name='inventoryLeast' hidden={!this.props.checkedList.includes('Tồn kho tối thiểu')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].size} onChange={this.props.handleChange} label='Kích thước' input='text' name='size' hidden={!this.props.checkedList.includes('Kích thước')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].source} onChange={this.props.handleChange} label='Nguồn gốc' input='text' name='source' hidden={!this.props.checkedList.includes('Nguồn gốc')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].price} onChange={this.props.handleChange} label='Giá bán' input='currency' name='price' hidden={!this.props.checkedList.includes('Giá bán')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].costPrice} onChange={this.props.handleChange} label='Giá vốn' input='currency' name='costPrice' hidden={!this.props.checkedList.includes('Giá vốn')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].description} onChange={this.props.handleChange} label='Mô tả' input='text' name='description' hidden={!this.props.checkedList.includes('Mô tả')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].status} onChange={this.props.handleChange} values={this.state.status} label='Trạng thái' input='select' name='status' hidden={!this.props.checkedList.includes('Trạng thái')} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].creator} onChange={this.props.handleChange} values={creators} label='Người tạo' input='select' name='creator' hidden={!this.props.checkedList.includes('Người tạo')} disable={true} />
              <SearchFilter mode={this.props.mode}  default={this.props.mode === 'add'? null : this.props.selected[0].createdDate} onChange={this.props.handleChange} label='Ngày tạo' input='date' name='createdDate' hidden={!this.props.checkedList.includes('Ngày tạo')} disable={true} />
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Hình ảnh' key='2'>
            <Card></Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab='Thông tin thêm' key='3'>
            <Card></Card>
          </Tabs.TabPane>
        </Tabs>

        <Drawer
          title='Tùy chọn hiển thị'
          placement='right'
          visible={this.state.visible}
          closable={false}
          onClose={() => this.setState({visible:false})}
          width={400}
        >
          <DisplaySearchField onCheck={this.props.onCheck} checkedList={this.props.checkedList} fields={this.props.fields} />
        </Drawer>
      </Form>
    );
  }
}

export default ModalContent;
