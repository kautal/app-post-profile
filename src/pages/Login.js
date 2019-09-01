import React from 'react'
import { Form, Icon, Input, Layout, Button } from 'antd'
import axios from 'axios'

const FormItem = Form.Item

class Login extends React.Component {
    
    render() {
        const { getFieldDecorator } = this.props.form

        return(
            <div>
                <h1>Login</h1>
                <Form onSubmit={this.onFormLoginSubmit}> 
                    <FormItem>
                        {
                            getFieldDecorator("username", {
                                rules: [{ required: true,  message: "Please input username" }]
                            })(
                                <Input prefix={<Icon type="user" />} placeholder="Username" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator("password", {
                                rules: [{ required: true, message: "Please input password"}]
                            })(
                                <Input prefix={<Icon type="lock" />} placeholder="Password" type="password" />
                            )
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" icon="login" htmlType="submit" >Masuk</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create() (Login)