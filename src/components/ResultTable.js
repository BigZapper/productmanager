import { Spin, Table } from 'antd';
import React from 'react';

class ResultTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedRowKeys: [],
      selectedRows: [],
      loading: false
    };
  }

  componentDidMount(){
    this.setState({
      data: this.props.products
    });
  }
  render() {
    const columns = [
      {
        width: 130,
        title: 'Loại sản phẩm ',
        dataIndex: 'productType',
        align: 'left'
      },
      {
        width: 140,
        title: 'Nhóm sản phẩm ',
        dataIndex: 'productGroup',
        align: 'left'
      },
      {
        width: 130,
        title: 'Mã sản phẩm ',
        dataIndex: 'productId',
        align: 'left'
      },
      {
        width: 250,
        title: 'Tên sản phẩm ',
        dataIndex: 'productName',
        align: 'left'
      },
      {
        width: 130,
        title: 'Mã barcode ',
        dataIndex: 'barcode',
        align: 'left'
      },
      {
        width: 110,
        title: 'Đơn vị tính ',
        dataIndex: 'unit',
        align: 'left'
      },
      {
        width: 150,
        title: 'Nhà cung cấp ',
        dataIndex: 'provider',
        align: 'left'
      },
      {
        width: 150,
        title: 'Tồn kho tối thiểu ',
        dataIndex: 'inventorLeast',
        align: 'left'
      },
      {
        width: 110,
        title: 'Kích thước ',
        dataIndex: 'size',
        align: 'right'
      },
      {
        width: 150,
        title: 'Nguồn gốc ',
        dataIndex: 'source',
        align: 'left'
      },
      {
        width: 150,
        title: 'Giá bán ',
        dataIndex: 'price',
        align: 'left'
      },
      {
        width: 150,
        title: 'Giá vốn ',
        dataIndex: 'costPrice',
        align: 'left'
      },
      {
        width: 150,
        title: 'Mô tả ',
        dataIndex: 'description',
        align: 'left'
      },
      {
        width: 150,
        title: 'Trạng thái ',
        dataIndex: 'status',
        align: 'left'
      },
      {
        width: 150,
        title: 'Người tạo ',
        dataIndex: 'creator',
        align: 'left'
      },
      {
        width: 150,
        title: 'Ngày tạo ',
        dataIndex: 'createdDate',
        align: 'left'
      },
      {
        width: 150,
        title: 'Người cập nhật ',
        dataIndex: 'updator',
        align: 'left'
      },
      {
        width: 150,
        title: 'Ngày cập nhật ',
        dataIndex: 'updatedDate',
        align: 'left'
      }
    ];
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({ selectedRowKeys, selectedRows }, () => this.props.handleSelectRows(this.state.selectedRows));
  };
    const { selectedRowKeys, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange
    };
    const res = this.props.resultCol.map( result => result);
    return (
      <div className='table-wrapper'>
        <Spin spinning={loading}>
          <Table
            bordered
            rowSelection={rowSelection}
            columns={columns.filter(col => res.includes(col.title))}
            dataSource={this.props.products}
            scroll={{ x: 700, y: 150 }}
          />
        </Spin>
      </div>
    );
  }
}

export default ResultTable;
