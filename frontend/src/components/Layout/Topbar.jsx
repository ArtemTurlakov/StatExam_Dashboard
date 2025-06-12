import { Layout, Button, Avatar} from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined, 
    UserOutlined
  } from '@ant-design/icons';
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
    <div className='absolute inset-y-0 right-0'>
        <Avatar size={40}  style={{ backgroundColor: '#aaaaaa', margin: 12, }} icon={<UserOutlined />} />
    </div>
    
</Header>
    )
};