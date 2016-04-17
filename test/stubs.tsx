/// <reference path="../src/interfaces/interfaces.d.ts" />

import * as React from "react";
import { Route } from "react-router";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Immutable from "immutable";

// ******************************************************************************
// * UTILS
// ******************************************************************************
function makeActionCreator(type: string, ...argNames: string[]) {
  return function(...args: any[]) {
    let action: any = { type : type };
    argNames.forEach((arg, index) => {
        let argName: string = argNames[index];
        let argValue: any = args[index];
        action[argName] = argValue;
    });
    return action;
  };
}

// ******************************************************************************
// * LAYOUT
// ******************************************************************************
class AppLayout extends React.Component<any, any> {
    public render() {
    const children  = this.props.children;
        return (
            <div>
                {children}
            </div>
        );
    }
}

// ******************************************************************************
// * CONSTANTS
// ******************************************************************************
const ACTION_TYPES = {
    ADD_REPO_BEGIN: "ADD_REPO_BEGIN",
    ADD_REPO_SUCCESS: "ADD_REPO_SUCCESS",
    ADD_USER_BEGIN: "ADD_USER_BEGIN",
    ADD_USER_SUCCESS: "ADD_USER_SUCCESS"
};

// ******************************************************************************
// * USER PAGE ACTIONS
// ******************************************************************************
let addUserBegin = makeActionCreator(ACTION_TYPES.ADD_USER_BEGIN);
let addUserSuccess = makeActionCreator(ACTION_TYPES.ADD_USER_SUCCESS);
let addUserAsync =  () => {
    return (dispatch: Redux.Dispatch) => {
        dispatch(addUserBegin());
        // fake delay
        setTimeout(() => { dispatch(addUserSuccess()); }, (Math.floor(Math.random() * 6) + 500));
    }
};

let userActions = { addUserAsync, addUserBegin, addUserSuccess };

function mapStateToPropsUserPage(state: any) { return { users: state.users }; }
function mapDispatchToPropsUserPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(userActions, dispatch) };
}

// ******************************************************************************
// * USER PAGE COMPONENT
// ******************************************************************************
@connect(mapStateToPropsUserPage, mapDispatchToPropsUserPage)
class UsersPage extends React.Component<any, any> {
    public render() {
        return (
            <div>Users Page!</div>
        );
    }
}

// ******************************************************************************
// * REPOS PAGE ACTIONS
// ******************************************************************************
let addRepoBegin = makeActionCreator(ACTION_TYPES.ADD_REPO_BEGIN);
let addRepoSuccess = makeActionCreator(ACTION_TYPES.ADD_REPO_SUCCESS);
let addRepoAsync =  () => {
    return (dispatch: Redux.Dispatch) => {
        dispatch(addRepoBegin());
        // fake delay
        setTimeout(() => { dispatch(addRepoSuccess()); }, (Math.floor(Math.random() * 6) + 500));
    }
};

let repoActions = { addRepoAsync, addRepoBegin, addRepoSuccess };

function mapStateToPropsReposPage(state: any) { return { repos: state.repos }; }
function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(repoActions, dispatch) };
}

// ******************************************************************************
// * REPOS PAGE COMPONENT
// ******************************************************************************
@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
class ReposPage extends React.Component<any, any> {
    public render() {
        return (
            <div>Repos Page!</div>
        );
    }
}

// ******************************************************************************
// * ROUTES
// ******************************************************************************
const routes: JSX.Element = (
    <Route component={AppLayout}>
        <Route path="/users" component={UsersPage} />
        <Route path="/repos" component={ReposPage} />
    </Route>
);

// ******************************************************************************
// * REDUCERS
// ******************************************************************************
const defaultUsersState = Immutable.fromJS({
    usersCount: 0
});

const usersReducer: Redux.Reducer = (previousState: any = defaultUsersState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER_BEGIN:
        case ACTION_TYPES.ADD_USER_SUCCESS:
        default:
            return previousState;
    }
};

const defaultReposState = Immutable.fromJS({
    reposCount: 0
});

const reposReducer: Redux.Reducer = (previousState: any = defaultReposState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_REPO_BEGIN:
        case ACTION_TYPES.ADD_REPO_SUCCESS:
        default:
            return previousState;
    }
};

export { AppLayout, UsersPage, ReposPage, routes, usersReducer, reposReducer };
