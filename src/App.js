import React from "react";
import { initializeApp } from "./redux/appReducer";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import UsersContainer from "./componets/Users/UsersContainer";
import ProfileContainer from "./componets/Profile/ProfileContainer";
import HeaderContainer from "./componets/Header/HeaderContainer";
import Login from "./componets/Login/Login";
import DialogsContainer from "./componets/Dialogs/DialogsContainer";
import {
  TeamOutlined,
  HomeOutlined,
  UserOutlined,
  SmileOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import FooterComponent from "./componets/Footer/FooterComponent";
import { connect } from "react-redux";
import Preloader from "./componets/UI/Preloader/Preloader";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  componentDidMount() {
    this.props.initializeApp();
  }
  items = [
    getItem(<NavLink to="/home">Главная</NavLink>, "1", <HomeOutlined />),
    getItem(<NavLink to="/profile">Профиль</NavLink>, "2", <SmileOutlined />),
    getItem("Профиль", "sub1", <UserOutlined />, [
      getItem(<NavLink to="/dialogs">Мессенджер</NavLink>, "3"),
      getItem(<NavLink to="/friends">Друзья</NavLink>, "4"),
      getItem(<NavLink to="/notifiactions">Уведомления</NavLink>, "5"),
    ]),
    getItem(
      <NavLink to="/users">Все пользователи</NavLink>,
      "9",
      <TeamOutlined />
    ),
    getItem("Разработчик", "9", <DeploymentUnitOutlined />),
  ];

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={(value) => this.setState(value)}
        >
          <div
            style={{
              height: 32,
              margin: 16,
              background: "rgba(255, 255, 255, 0.2)",
            }}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={this.items}
          />
        </Sider>
        <Layout className="site-layout">
          <HeaderContainer />
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Routes>
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route exact path="/profile" element={<ProfileContainer />} />
                <Route path="/dialogs" element={<DialogsContainer />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </div>
          </Content>
          <FooterComponent />
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
