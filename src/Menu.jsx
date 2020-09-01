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
        this.removeList = this.removeList.bind(this);
    }

    toggleActive(status = null){
        this.setState(prevState => {
            if(status !== null)
                return {active: status}
            else
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

    removeList(){
        const id = this.props.activeListId;
        this.props.onChangeList(0);
        this.props.removeList(id);
    }

    render(){
        const lists = this.props.lists.map(el => {
            return(
                <div key={el.id} className={this.props.activeListId === el.id ? "menu__modal__content__list active" : "menu__modal__content__list"}
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
        const displayTrashIcon = this.props.activeListId < 1
            ? "icon trash alternate d-none" : "icon trash alternate"

        return(
            <div className="menu">
                <div className="menu__togler">
                    <i onClick={() => this.toggleActive()} className="icon list"></i>
                    <span>{this.props.lists.find(el => el.id === this.props.activeListId).name}</span>
                    
                    <i onClick={() => this.removeList()} id="settings" className={displayTrashIcon}></i>
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

                <div className="menu__modal__closePol" onClick={() => this.toggleActive(false)}></div>

            </div>
        )
    }
}

export default Menu;