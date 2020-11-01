import React, { Component } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import Footer from './components/Footer';



export default class Main extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <Content />
                <Footer />
            </div>
        )
    }
}
