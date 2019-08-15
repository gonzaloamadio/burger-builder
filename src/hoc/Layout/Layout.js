import React, { Component } from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

// We use state here to manage/coordinate which components to show and hide.
// For example, nav items.
export default class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer : ! prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler} 
                    open={this.state.showSideDrawer} 
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
            )
    }
}