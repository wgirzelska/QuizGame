import React, { useState, useLayoutEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarsOutlined,
  TrophyOutlined,
  PlayCircleOutlined
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import logo from "../../assets/logo.png";
import "./style.css"

// kolory
const greyHeader = '#d6e0f5'
const bgWhite = '#FFFFFF'

const { Header, Sider, Content } = Layout;

export const WorkerPanel = () => {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true)
  const [collapsed, setCollapsed] = useState(false);


  useLayoutEffect(() => {
    const element = document.getElementById('my-element');
    element.style.display = isVisible ? 'block' : 'none';
  }, [isVisible]);

  return (
    <Layout style={{ height: "100vh"}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "4",
              icon: <BarsOutlined />,
              label: <Link to="rules" onClick={() => setIsVisible(false)}>Rules</Link>
            },
            {
              key: "2",
              icon: <PlayCircleOutlined />,
              label: <Link to="game" onClick={() => setIsVisible(false)}>Quiz Game</Link>
            },
            {
              key: "3",
              icon: <TrophyOutlined />,
              label: <Link to="ranking" onClick={() => setIsVisible(false)}>Ranking</Link>
            }
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{ padding: 0, background: bgWhite, width: "100%", marginBottom: '-30px' }}
        >
          
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div class="logoLogout">
            
            <Button
            className="logout"
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "30px",
              top: "-50px"
            }}
            type="primary"
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
          </div>
          
        </Header>
        <Content
          style={{
            marginTop: "30px",
            padding: 25,
            minHeight: 280,
            background: greyHeader
          }}
        >
        <section class="wrapper">
        <div class="top">Knowledge Kingdom</div>
        <div class="bottom" aria-hidden="true">Knowledge Kingdom</div>
        </section>   
        
        <div className='beforePage' id="my-element">
          <img className="logoSign" src={logo} style={{width: 500}}/>
        </div>
        
         <br></br>
         <br></br>
 
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WorkerPanel;
