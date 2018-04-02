import React from 'react';
import ReactDOM from "react-dom";

import { Menu, Icon } from "antd";
const SubMenu = Menu.SubMenu;
const ItemGroup = Menu.ItemGroup;

class App extends React.Component {
    render() {
        return (
            <div>
                <h1>Hello world!</h1>
            </div>
        );
    }
}

class Sider extends React.Component {

    render() {
      return (
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
            <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                <ItemGroup key="g1" title="Item 1">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                </ItemGroup>
                <ItemGroup key="g2" title="Item 2">
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                </ItemGroup>
            </SubMenu>
        </Menu>
      );
    }
  }

ReactDOM.render(
    <Sider />,
    document.getElementById('root')
);