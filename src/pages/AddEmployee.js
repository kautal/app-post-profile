import React from 'react'
import { Form, Input, Button, DatePicker, Radio } from 'antd'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'

const urlApi = 'http://localhost:4000/api/employee'
const { TextArea } = Input

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 }
}

const formTailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8, offset: 4 }
}

class AddEmployee extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            registerProgress: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return
            }
            console.log(values)
            this.createNew(values)
        })
    }

    createNew = (values) => {
        this.setState({ registerProgress: true })
        axios.post(urlApi, {
            name: values.name,
            birthday: values.birthday,
            email: values.email,
            telp: values.telp,
            address: values.address,
            province: values.province,
            city: values.city,
            stats: values.stats
        }).then(res => {
            alert('Success')
            this.setState({ registerProgress: false })
        }).catch(err => {
            console.log(err)
            alert('Error')
            this.setState({ registerProgress: false })
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const config = {
            rules: [
                {
                    type: 'object',
                    required: true,
                    message: 'Mohon masukkan tanggal lahir anda'
                }
            ],
        }

        return (
            <div>
                <Header/>
                <Form onSubmit={this.handleSubmit} >
                    <Form.Item {...formItemLayout} label="Name">
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Mohon masukkan nama anda'
                                },
                            ]
                        })(<Input placeholder="Masukkan nama anda" />)
                    }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Tanggal Lahir">
                        {
                            getFieldDecorator('birthday', config)(
                                <DatePicker style={{ width: 300 }} placeholder="Masukkan tanggal lahir anda" />
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="E-mail">
                        {
                            getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'E-mail tidak valid'
                                    },
                                    {
                                        required: true,
                                        message: 'Mohon masukkan e-mail anda'
                                    }
                                ]
                            })(<Input placeholder="Masukkan e-mail anda" />)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="No. Telp">
                        {
                            getFieldDecorator('telp', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mohon masukkan no. telp anda'
                                    }
                                ]
                            })(<Input placeholder="Masukkan no. telp anda" />)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Alamat">
                        {
                            getFieldDecorator('address', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mohon masukkan alamat anda'
                                    }
                                ]
                            })(<TextArea rows={4} placeholder="Masukkan alamat anda" />)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Provinsi">
                        {
                            getFieldDecorator('province', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mohon masukkan provinsi anda'
                                    },
                                ]
                            })(<Input placeholder="Masukkan provinsi anda" />)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Kota">
                        {
                            getFieldDecorator('city', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mohon masukkan kota anda'
                                    },
                                ]
                            })(<Input placeholder="Masukkan kota anda" />)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="Status">
                        {
                            getFieldDecorator('stats', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Mohon dipilih'
                                    },
                                ]
                            })(
                                <Radio.Group>
                                    <Radio value='Dilakukan'>Enable</Radio>
                                    <Radio value='Belum Dilakukan' >Disable</Radio>
                                </Radio.Group>
                            )
                        }
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.registerProgress}>
                        {
                            this.state.registerProgress ? "Submiting..." : "Submit"
                        }
                        </Button>
                    </Form.Item>
                    <Form.Item {...formTailLayout}>
                        <Button>
                            <Link to='/'>Cancel</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(AddEmployee)