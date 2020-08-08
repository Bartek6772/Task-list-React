import React, { Component } from 'react';

import "./../node_modules/semantic-ui-css/semantic.css";
import "./css/Menu.css";

class Menu extends Component{
    constructor(){
        super();
        this.state = {
            active: false,
        }
        this.toggleActive = this.toggleActive.bind(this);
        this.changeActiveList = this.changeActiveList.bind(this);
        this.editListShow = this.editListShow.bind(this);
    }

    toggleActive(){
        this.setState(prevState => {
            return {active: !prevState.active}
        })
    }

    changeActiveList(id){
        this.props.onChangeList(id);
        this.toggleActive();
    }

    editListShow(){
        this.props.editListShow();
        this.toggleActive();
    }

    render(){
        const lists = this.props.lists.map(el => {
            return(
                <div key={el.id} className="menu__modal__content__list"
                    onClick={() => this.changeActiveList(el.id)}
                >
                    <div className="list__icon">
                        <i className="icon tasks"></i>
                    </div>
                    <div className="list__name">
                        {el.name}
                    </div>
                </div>
            );
        })

        const menuModalClass = this.state.active === true
            ? "menu__modal menu__modal--visible" : "menu__modal";

        return(
            <div className="menu">
                <div className="menu__togler">
                    <i onClick={() => this.toggleActive()} className="icon list"></i>
                    <span>{this.props.lists.find(el => el.id === this.props.activeListId).name}</span>
                </div>
                <div className={menuModalClass}>
                    <div className="menu__modal__header">
                        Menu
                        <i onClick={() => this.toggleActive()} className="icon bars menu__modal__close"></i>
                    </div>
                    <div className="menu__modal__content">
                        {lists}
                    </div>
                    <div className="menu__modal__addList" onClick={() => this.editListShow()}>
                        <i className="icon plus"></i>
                        Add list
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu;