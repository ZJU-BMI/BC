import React from 'react';
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Switch, withRouter} from "react-router-dom"

import { Layout, Menu, Icon, Card, Avatar } from "antd";
const { Header, Sider, Content } = Layout;
const { Meta } = Card;

import "./index.css"

class CardContent extends React.Component {
    render() {
        return (
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                <Card
                    style={{ width: 300}}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta 
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
            </Content>
        );
    }
}

function Nav2() {
    return (
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            Nav 2 content
        </Content>
    )
}

function Nav3() {
    return (
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
            Nav 3 content
        </Content>
    )
}

class SiderDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const { history } = this.props;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" />
                    <Menu 
                        theme="dark" 
                        mode="inline" 
                        defaultSelectedKeys={['/']}
                        selectedKeys={[history.location.pathname]}
                    >
                        <Menu.Item key="/"> 
                            <Icon type="user"/>
                            Card
                            {/* <span>Card</span> */}
                            <Link to="/" />
                        </Menu.Item>
                        <Menu.Item key="/nav2">
                            <Icon type="video-camera" />
                            Nav 2
                            <Link to="/nav2" />
                        </Menu.Item>
                        <Menu.Item key="/nav3">
                            <Icon type="upload" />
                            Nav 3
                            <Link to="/nav3" />
                        </Menu.Item>
                    </Menu>
                </Sider>
            
                <Layout>
                    <Header style={{ background: '#fff', padding: 0}} >
                        <Icon 
                            className="trigger"
                            type = {this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Switch>
                        <Route exact path="/" component={CardContent}/>
                        <Route exact path="/nav2" component={Nav2}/>
                        <Route exact path="/nav3" component={Nav3}/>
                    </Switch>
                </Layout>
            </Layout>
        );
    }
}

const SiderDemoWithRouter = withRouter(SiderDemo);


ReactDOM.render(
    <Router>
        <SiderDemoWithRouter />
    </Router>,
    document.getElementById('root')
);