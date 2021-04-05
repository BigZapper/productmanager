import { Button, Col, Input, Modal } from 'antd';
import React, { Component } from 'react';
import * as FileSaver from 'file-saver';
import * as CSV from 'xlsx';
import moment from 'moment';

const csvData = [
    {
        'key': 'key',
        'Loại sản phẩm': 'productType',
        'Nhóm sản phẩm': 'productGroup',
        'Mã sản phẩm': 'productId',
        'Tên sản phẩm': 'productName',
        'Mã barcode': 'barcode',
        'Đơn vị tính': 'unit',
        'Nhà cung cấp': 'provider',
        'Tồn kho tối thiểu': 'inventorLeast',
        'Kích thước': 'size',
        'Nguồn gốc': 'source',
        'Giá bán': 'price',
        'Giá vốn': 'costPrice',
        'Mô tả': 'description',
        'Trạng thái': 'status'
    }
];
let dataParse = [];
class ImportButton extends Component {
    state = {
        visible: false
    };
    showModal = () => {
        this.setState({
            visible: true
        });
    };
    handleOk = () => {
        let res = [];
        for (let i = 2; i < dataParse.length; i++) {
            let item = {};
            for (let j = 0; j < 14; j++) {
                let name = dataParse[1][j];
                let value = dataParse[i][j];
                item.[name] = value;
            }
            item.CreatedBy = 'Nguyễn Văn A';
            item.CreatedDate = moment();
            res.push(item);
        }

        let check = false;
        for (let i = 0; i < this.props.data.length; i++) {
            for (let j = 0; j < res.length; j++) {
                if (res[j].key == this.props.data[i].key) {
                    console.log('Key ' + res[j].key + ' đã tồn tại');
                    check = true;
                }
                if (res[j].productId == this.props.data[i].productId) {
                    console.log('Mã sản phẩm ' + res[j].productId + ' đã tồn tại');
                    check = true;
                }
                if (res[j].barcode == this.props.data[i].barcode) {
                    console.log('Mã barcode ' + res[j].barcode + ' đã tồn tại');
                    check = true;
                }
            }
        }
        // if (!check) this.props.importedData(res)
        // else this.props.importedData([])
        const sp = JSON.parse(localStorage.getItem('product')).concat(res);
        console.log(sp);
        localStorage.setItem('product', JSON.stringify(sp));
        this.setState({
            visible: false
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false
        });
    };
    handleImportChange = (e) => {
        e.preventDefault();
        if (e.target.files.length === 0) return null
        var files = e.target.files, f = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            let readedData = CSV.read(data, { type: 'binary' });
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            dataParse = CSV.utils.sheet_to_json(ws, { header: 1 });
        };
        reader.readAsBinaryString(f);
    };
    handleTemplate = () => {
        const fileName = 'Product example file';
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.csv';
        const ws = CSV.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = CSV.write(wb, { bookType: 'csv', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };
    render() {
        return (
            <React.Fragment>
                <Button style={{ margin: 3 }} type='primary' onClick={this.showModal}>Nhập file</Button>
                <Modal
                    visible={this.state.visible}
                    title='Nhập file'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="template" type="primary" onClick={this.handleTemplate}>Tải file mẫu</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>Lưu</Button>,
                        <Button key="back" type='primary' onClick={this.handleCancel}>Hủy</Button>
                    ]}
                >
                    <Input type='file' accept='.xlsx, .xls, .csv' onChange={this.handleImportChange} />
                </Modal>
            </React.Fragment>
        );
    }
}
export default ImportButton;
