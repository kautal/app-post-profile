import React from 'react'
import { Table, Divider, Button, Input, Tag } from 'antd'
import {Link} from 'react-router-dom'
import Header from './components/Header'
import axios from 'axios'
import moment from 'moment'

const { Search } = Input
const urlApi = 'http://localhost:4000/api/employee'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      employees: [],
      idSearch: ''
    }
  }

  componentDidMount() {
    this.fetchAll()
  }

  fetchAll() {
    axios.get(urlApi).then(res => {
      let employees = res.data
      this.setState({ employees })
      moment(this.state.employees.birthday).format('LLLL')
      console.log(employees)
    }).catch(err => {
      console.log(err)
    })
  }

  delete(id) {
    axios.delete(`${urlApi}?id=${id}`).then(res => {
      alert('Success')
      this.fetchAll()
    }).catch(err => {
      alert('Error')
      console.log(err)
    })
  }
  
  onSearch = (name) => {
    axios.get(`${urlApi}?name=${name}`).then(res => {
      let employee = res.data
      this.setState({ employees: employee })
      console.log(employee)
      console.log(this.state.employees)
    })
  }

  changeHandle = (event) => {
    this.setState({ idSearch: event.target.value})
  }

  render() {
    const columns = [
      {
        title: 'No',
        key: 'number',
        render: (text, record, index) => (
          <span>{index +1}</span>
        )
      },
      {
        title: 'Nama',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: 'Tanggal Lahir',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: 'No Telp',
        dataIndex: 'telp',
        key: 'telp',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Status',
        dataIndex: 'stats',
        key: 'stats',
      },
      {
        title: 'Kontrol',
        key: 'action',
        render: (text, record) => (
          <span>
            <a><Link to={`/edit/${record.id}`}>Edit</Link></a>
            <Divider type='vertical' />
            <a onClick={() => this.delete(record.id)}>Hapus</a>
          </span>
        )
      },
    ]
    return (
      <div>
        <Header/>
        <Search
          placeholder="Cari Berdasarkan Nama Lengkap"
          enterButton="Cari"
          onSearch={value => this.onSearch(value)}
          style={{ width: 300 }}
        />
        <Button style={{ float: 'right' }}><Link to='/tambah'>Tambah</Link></Button>
        <Table columns={columns} dataSource={this.state.employees} />
      </div>
    )
  }
}