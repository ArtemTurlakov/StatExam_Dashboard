import { Layout, Button, Avatar} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, 
    UserOutlined
  } from '@ant-design/icons';
import UserProfile from './UserProfile';
const {Header} = Layout;


export default function Topbar({collapsed, colorBgContainer, Click}) {
return(
<Header style={{ padding: 0, top: 0,}} className='flex relative'>
    <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
        onClick={Click}
        style={{
        background: colorBgContainer,
        fontSize: '16px',
        margin: 10,
    }}/>
    <UserProfile/>
    
</Header>
    )
};