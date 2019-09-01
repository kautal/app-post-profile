import React from 'react'
import { Form, Input, Button, DatePicker, Radio, Divider } from 'antd'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
import moment from 'moment'

const urlApi = 'http://localhost:4000/api/employee'
const FormItem = Form.Item
const RadioGroup = Radio.Group

class EditEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employee: {},
            name: {
                value: ''
            },
            birthday: {
                value: ''
            },
            email: {
                value: ''
            },
            telp: {
                value: ''
            },
            address: {
                value: ''
            },
            province: {
                value: ''
            },
            city: {
                value: ''
            },
            stats: {
                value: ''
            }
        }
    }

    componentDidMount() {
        this.getById()
    }

    getById() {
        const {
            match: {params}
        } = this.props
        console.log(params)
        axios.get(`${urlApi}/${params.id}`).then(res => {
            this.setState({ employee: res.data })
            this.setState({
                name: {value: this.state.employee.name},
                birthday: {value: this.state.employee.birthday},
                email: {value: this.state.employee.email},
                telp: {value: this.state.employee.telp},
                address: {value: this.state.employee.address},
                province: {value: this.state.employee.province},
                city: {value: this.state.employee.city},
            })
            console.log(this.state.employee.name)
            console.log(this.state.name.value)
        }).catch(err => {
            console.log(err)
        })
    }

    editForm = (name, birthday, email, telp, address, province, city) => {
        axios.put(`${urlApi}?id=${this.state.employee.id}`, {
            name: name,
            email: email,
            birthday: birthday,
            telp: telp,
            address: address,
            province: province,
            city: city

        }).then(res => {
            alert('Success')
        }).catch(err => {
            console.log(err)
            alert('Error')
        })
    }

    onClickSave = () => {
        this.editForm(
            this.state.name.value, 
            this.state.birthday.value, 
            this.state.email.value, 
            this.state.telp.value, 
            this.state.address.value, 
            this.state.province.value, 
            this.state.city.value 
        )
        this.setState({
            name: {
                value: this.state.name.value
            },
            birthday: {
                value: this.state.birthday.value
            },
            email: {
                value: this.state.email.value
            },
            telp: {
                value: this.state.telp.value
            },
            address: {
                value: this.state.address.value
            },
            province: {
                value: this.state.province.value
            },
            city: {
                value: this.state.city.value
            },
        })
    }


    onChangeName = (e) => {
        this.setState({ name: {value: e.target.value }})
    }

    onChangeBirthday = (date, dateString) => {
        this.setState({ birthday: {value: date, defaultValue: date }})
    }

    onChangeEmail = (e) => {
        this.setState({ email: {value: e.target.value }})
    }

    onChangeTelp = (e) => {
        this.setState({ telp: {value: e.target.value }})
    }

    onChangeAddress = (e) => {
        this.setState({ address: {value: e.target.value }})
    }

    onChangeProvince = (e) => {
        this.setState({ province: {value: e.target.value }})
    }

    onChangeCity = (e) => {
        this.setState({ city: {value: e.target.value }})
    }

    render() {
        return (
            <div>
                <Header/>
                <Form style={{ width: '50vw', margin: 'auto' }} layout='vertical' >
                    <FormItem label="Nama " colon={false} labelCol={{ span: 1 }} >
                        <Input value={this.state.name.value} placeholder={this.state.name.value} onChange={this.onChangeName} />
                    </FormItem>
                    <FormItem label="Tanggal Lahir" colon={false} >
                        <DatePicker defaultValue={moment(this.state.birthday.value)} value={moment(this.state.birthday.value)} onChange={this.onChangeBirthday} style={{ width: '50vw' }} />
                    </FormItem>
                    <FormItem label="E-mail" colon={false} >
                        <Input value={this.state.email.value} placeholder={this.state.email.value} onChange={this.onChangeEmail} />
                    </FormItem>
                    <FormItem label="No. Telp" colon={false} >
                        <Input value={this.state.telp.value} placeholder={this.state.telp.value} onChange={this.onChangeTelp} />
                    </FormItem>
                    <FormItem label="Alamat" colon={false} >
                        <Input value={this.state.address.value} placeholder={this.state.address.value} onChange={this.onChangeAddress} />
                    </FormItem>
                    <FormItem label="Provinsi" colon={false} >
                        <Input value={this.state.province.value} placeholder={this.state.province.value} onChange={this.onChangeProvince} />
                    </FormItem>
                    <FormItem label ="Kota" colon={false} >
                        <Input value={this.state.city.value} placeholder={this.state.city.value} onChange={this.onChangeCity} />
                    </FormItem>
                    <FormItem label="Status" colon={false} >
                        <RadioGroup defaultValue={this.state.stats.value}>
                            <Radio value='Dilakukan'>Enable</Radio>
                            <Radio value='Belum Dilakukan'>Disable</Radio>
                        </RadioGroup>
                    </FormItem>
                    <div style={{ float: 'right' }} >
                        <Button type="primary" onClick={this.onClickSave} >Save</Button>
                        <Divider type="vertical" dashed="false" />
                        <Button><Link to='/'>Cancel</Link></Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default EditEmployee