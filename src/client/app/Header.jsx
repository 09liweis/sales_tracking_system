import React from 'react';
import { Link } from 'react-router-dom';
import Birthday from './components/Birthday.jsx';

import { Button, Drawer, Toolbar, ListItem } from 'react-md';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible: false, position: 'left' };
        this.handleLink = this.handleLink.bind(this);
    }
    openMenu() {
        console.log('test');
        this.setState({ visible: true, position: 'left' });
    }
    closeDrawer() {
        this.setState({ visible: false });
    }
    handleVisibility(visible) {
        this.setState({ visible });
    }
    handleLink(link) {
        // this.props.history.push(link);
    }
    render() {
        const { visible, position } = this.state;
        const isLeft = position === 'left';
        const closeBtn = <Button icon onClick={this.closeDrawer.bind(this)}>{isLeft ? 'arrow_back' : 'close'}</Button>;
        return (
            <div>
            <Toolbar
                colored
                nav={<Button flat onClick={this.openMenu.bind(this)}>菜单</Button>}
                title="Yan的淘宝交易管理"
                
            />
            <Drawer
                id="simple-drawer-example"
                type={Drawer.DrawerTypes.TEMPORARY}
                visible={visible}
                position={position}
                onVisibilityChange={this.handleVisibility.bind(this)}
                navItems={[
                    <Link to='/' key={1}><ListItem primaryText="交易管理" /></Link>,
                    <Link to='/transaction/add' key={2}><ListItem primaryText="添加商品" /></Link>,
                    <Link to='/items' key={3}><ListItem primaryText="商品管理" /></Link>,
                    <Link to='/item/add' key={4}><ListItem primaryText="添加新商品品种" /></Link>,
                    <Link to='/todo' key={5}><ListItem primaryText="反馈与修复" /></Link>
                ]}
                header={(
                <Toolbar
                    nav={isLeft ? null : closeBtn}
                    actions={isLeft ? closeBtn : null}
                    className="md-divider-border md-divider-border--bottom"
                />
              )}
            />
            <Birthday />
            </div>
        );
    }

}

export default Header;