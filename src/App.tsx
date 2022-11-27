import React from 'react';
import { Layout, Typography, ConfigProvider } from "antd";
import { AddProjectButton, ProjectsList } from "./features/projects/components";
import './App.css';
import { useSelector } from "react-redux";
import { selectHasProjects, selectShowCreationForm } from "./features/projects/projectsSlice";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const hasProjects = useSelector(selectHasProjects);
  const showForm = useSelector(selectShowCreationForm);

  return (
    <ConfigProvider theme={{
      components: {
        Layout: {
          colorBgHeader: '#F7F9FD',
          colorBgBody: hasProjects || showForm ? '#F7F9FD' : '#ffffff',
        }
      }
    }}>
      <Layout className="layout" >
        <AddProjectButton className="header-add-project-btn" />
        <Header className="header">
          <img src="/img/ThunkableBeaver.png" className="logo" alt="logo" />
          <Title level={5} className="title">My Projects</Title>
        </Header>
        <Content className="content">
          <ProjectsList />
        </Content>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
