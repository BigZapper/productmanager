import React, { useEffect, useState } from 'react';
import { Layout, Breadcrumb, Spin, Row, Col, Button, Drawer, notification, Upload } from 'antd';
import { CodeSandboxOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import SearchForm from './SearchForm';
import ResultTable from './ResultTable';
import Display from './Display';
import Modal from 'antd/lib/modal/Modal';
import ModalContent from './ModalContent';
import * as CSV from 'xlsx';
import ImportButton from './ImportButton';

const btnStyles = {
  marginTop: 5,
  marginBottom: 5,
  marginRight: 5
};
function Content(props) {
  const [visible, setVisible] = useState(false);
  const [isModalImportVisible, setIsModalImportVisible] = useState(false);
  const [showModelField, setShowModalField] = useState(['Loại sản phẩm', 'Nhóm sản phẩm', 'Mã sản phẩm', 'Tên sản phẩm', 'Mã barcode', 'Số lượng', 'Đơn vị tính', 'Giá bán ', 'Giá vốn ', 'Mô tả ', 'Trạng thái ']);
  const [showField, setShowField] = useState(['Mã sản phẩm', 'Tên sản phẩm', 'Mã barcode']);
  const [showResult, setShowResult] = useState(['Mã sản phẩm ', 'Tên sản phẩm ', 'Mã barcode ']);
  const [searchValues, setSearchValues] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [products, setProducts] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [modeForm, setModeForm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const fields = ['Loại sản phẩm', 'Nhóm sản phẩm', 'Mã sản phẩm', 'Tên sản phẩm', 'Mã barcode', 'Số lượng', 'Đơn vị tính', 'Nhà cung cấp', 'Tồn kho tối thiểu', 'Kích thước', 'Nguồn gốc', 'Giá bán', 'Giá vốn', 'Mô tả', 'Trạng thái', 'Người tạo', 'Ngày tạo', 'Người cập nhật', 'Ngày cập nhật'];
  const fieldRes = ['Loại sản phẩm ', 'Nhóm sản phẩm ', 'Mã sản phẩm ', 'Tên sản phẩm ', 'Mã barcode ', 'Số lượng ', 'Đơn vị tính ', 'Nhà cung cấp ', 'Tồn kho tối thiểu ', 'Kích thước ', 'Nguồn gốc ', 'Giá bán ', 'Giá vốn ', 'Mô tả ', 'Trạng thái ', 'Người tạo ', 'Ngày tạo ', 'Người cập nhật ', 'Ngày cập nhật '];
  const handleCheck = newField => {
    if (showField.includes(newField)) {
      setShowField(showField.filter(field => field !== newField));
    } else {
      setShowField([...showField, newField]);
    }
  };
  const handleCheckResult = newResult => {
    if (showResult.includes(newResult)) {
      setShowResult(showResult.filter(result => result !== newResult));
    }
    else {
      setShowResult([...showResult, newResult]);
    }
  };
  const handleCheckForm = newField => {
    if (showModelField.includes(newField)) {
      setShowModalField(showModelField.filter(field => field !== newField));
    }
    else {
      setShowModalField([...showModelField, newField]);
    }
  };
  const handleChange = (val, key) => {
    setSearchValues({
      ...searchValues,
      [key]: val
    });
    console.log(searchValues);
  };
  const handleChangeForm = (val, key) => {
    setFormValues({
      ...formValues,
      [key]: val
    });
    console.log(formValues);
  };
  const handleSave = () => {
    const sp = props.products;
    const i = sp.findIndex(o => o.productId === formValues.productId);
    if (sp[i]) {
      sp[i] = formValues;
    } else {
      sp.push(formValues);
    }
    localStorage.setItem('product', JSON.stringify(sp));
    props.saveProducts(sp);
    setShowFrom(false);
  };
  const handleDelete = () => {
    const sp = props.products;
    const tmp = sp.filter(function (item) {
      for (const row in selectedRows) {
        if (item === selectedRows[row]) {
          console.log('item', item);
          console.log('row', selectedRows[row]);
          setSelectedRows([]);
          return false;
        }
      }
      return true;
    });
    console.log(tmp);
    localStorage.setItem('product', JSON.stringify(tmp));
    props.saveProducts(tmp);
  };
  // const handleUpload = (e) => {
  //   e.preventDefault();
  //   let files = e.target.files, f = files[0];
  //   let reader = new FileReader();
  //   reader.onload = function (e) {
  //     const data = e.target.result;
  //     const readedData = CSV.read(data, { type: 'binary' });
  //     const wsname = readedData.SheetNames[0];
  //     const ws = readedData.Sheets[wsname];

  //     /* Convert array to json*/
  //     const dataParse = CSV.utils.sheet_to_json(ws, { header: 1 });
  //     console.log(dataParse);
  //   };
  //   reader.readAsBinaryString(f);
  // };

  const handleSearch = () => {
    // if(searchValues.productId){
    //   setProducts(props.products.filter(product => product.productId.includes(searchValues.productId)));
    // } else if (searchValues.productType){
    //   setProducts(props.products.filter(product => product.productType.includes(searchValues.productType)));
    // } else if (searchValues.productGroup){
    //   setProducts(props.products.filter(product => product.productGroup.includes(searchValues.productGroup)));
    // } else if (searchValues.productName){
    //   setProducts(props.products.filter(product => product.productName.includes(searchValues.productName)));
    // } else if (searchValues.barcode){
    //   setProducts(props.products.filter(product => product.barcode.includes(searchValues.barcode)));
    // } else if (searchValues.unit){
    //   setProducts(props.products.filter(product => product.unit.includes(searchValues.unit)));
    // } else if (searchValues.provider){
    //   setProducts(props.products.filter(product => product.provider.includes(searchValues.provider)));
    // } else if (searchValues.inventorLeast){
    //   setProducts(props.products.filter(product => product.inventorLeast.includes(searchValues.inventorLeast)));
    // } else if (searchValues.size){
    //   setProducts(props.products.filter(product => product.size.includes(searchValues.size)));
    // } else {
    //   setProducts(props.products);
    // }
    // })
    let isEmpty = true;
    if (searchValues) {
      Object.values(searchValues).map(val => {
        if (val !== undefined) {
          isEmpty = false;
        }
      });
    }
    if (isEmpty) {
      setProducts(props.products);
    } else {
      setProducts(props.products.filter(function (item) {
        for (const key in searchValues) {
          if (item[key] === undefined || item[key].includes(searchValues[key])) {
            return true;
          }
        }
        return false;
      }));
    }
  };
  const openNotificationWithIcon = type => {
    notification[type]({
      message: 'Vui lòng chọn một dòng dữ liệu'
    });
  };
  const handleSelectRows = rows => {
    setSelectedRows(rows);
  };
  const handleCopy = () => {
    console.log(selectedRows);
    if (selectedRows.length > 1) {
      openNotificationWithIcon('error');
    } else if (selectedRows.length === 0 || selectedRows === undefined) {
      openNotificationWithIcon('error');
    } else {
      setModeForm('copy');
      setShowFrom(true);
    }
  };
  const handleShow = () => {
    console.log(selectedRows);
    if (selectedRows.length > 1) {
      openNotificationWithIcon('error');
    } else if (selectedRows.length === 0 || selectedRows === undefined) {
      openNotificationWithIcon('error');
    } else {
      setModeForm('show');
      setShowFrom(true);
    }
  };
  const handleEdit = () => {
    console.log(selectedRows);
    if (selectedRows.length > 1) {
      openNotificationWithIcon('error');
    } else if (selectedRows.length === 0 || selectedRows === undefined) {
      openNotificationWithIcon('error');
    } else {
      setModeForm('edit');
      setShowFrom(true);
    }
  };
  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);
  return (
    <div>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><CodeSandboxOutlined /> Sản phẩm</Breadcrumb.Item>
        <Breadcrumb.Item>Quản lý sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Layout.Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          backgroundColor: 'white'
        }}
      >
        <Spin spinning={false}>
          <SearchForm showField={showField} products={props.products} handleChange={handleChange} />
          <Row>
            <Col span={24}>
              <Button style={btnStyles} onClick={handleSearch} type='primary'>Tìm kiếm</Button>
              <Button style={btnStyles} type='primary' onClick={() => { setModeForm('add'); setShowFrom(true) }}>Thêm mới</Button>
              <Button style={btnStyles} type='primary' onClick={handleCopy}>Sao chép</Button>
              <Button style={btnStyles} type='primary' onClick={handleShow}>Xem</Button>
              <Button style={btnStyles} type='primary' onClick={handleEdit}>Chỉnh sửa</Button>
              <Button style={btnStyles} type='primary' onClick={handleDelete}>Xóa</Button>
              {/* <Button style={btnStyles} type='primary' onClick={() => setIsModalImportVisible(true)}>Nhập file</Button> */}
              <ImportButton data={products}/>
              <Button style={btnStyles} type='primary'>Tải dữ liệu (CSV)</Button>
              <SettingOutlined style={{ float: 'right', margin: 7, fontSize: 25, color: 'seagreen', cursor: 'pointer' }} onClick={() => setVisible(true)} />
            </Col>
          </Row>
          <ResultTable products={products} resultCol={showResult} handleSelectRows={handleSelectRows} />
        </Spin>
        <Modal
          visible={showFrom}
          title={modeForm === 'edit' ? 'Chỉnh sửa thông tin sản phẩm' : modeForm === 'show' ? 'Xem thông tin sản phẩm' : 'Thêm sản phẩm'}
          centered
          width={1000}
          onOk={handleSave}
          onCancel={() => setShowFrom(false)}
          footer={[
            <Button key="submit" type="primary" onClick={handleSave}>
              Lưu
            </Button>,
            <Button key="back" type="primary" onClick={() => setShowFrom(false)}>
              Đóng
            </Button>
          ]}
        >
          <ModalContent selected={selectedRows} mode={modeForm} fields={fields} checkedList={showModelField} handleChange={handleChangeForm} products={props.products} onCheck={handleCheckForm} />
        </Modal>
        {/* <Modal title="Basic Modal" visible={isModalImportVisible} onOk={handleUpload} onCancel={()=> setIsModalImportVisible(false)}>
          <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Modal> */}
        <Drawer
          title='Tùy chọn hiển thị'
          placement='right'
          visible={visible}
          closable={false}
          onClose={() => setVisible(false)}
          width={400}
        >
          <Display onCheck={handleCheck} onCheckResult={handleCheckResult} checkedResultList={showResult} checkedList={showField} fieldRes={fieldRes} fields={fields} />
        </Drawer>
      </Layout.Content>
    </div>
  );
}

export default Content;
