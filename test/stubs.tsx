/// <reference path="../src/interfaces/interfaces.d.ts" />

import * as React from "react";
import { IndexRoute, Route, Link } from "react-router";
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
                <div>
                    <Link to="/users">Users</Link>
                    <Link to="/repos">Repos</Link>
                </div>
                {children}
            </div>
        );
    }
}

// ******************************************************************************
// * HOME
// ******************************************************************************
class Home extends React.Component<any, any> {
    public render() {
        return (
            <div>Home!</div>
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
    };
};

let userActions = { addUserAsync, addUserBegin, addUserSuccess };

function mapStateToPropsUserPage(state: any) {
    return state.users;
}

function mapDispatchToPropsUserPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(userActions, dispatch) };
}

// ******************************************************************************
// * USER PAGE COMPONENT
// ******************************************************************************
@connect(mapStateToPropsUserPage, mapDispatchToPropsUserPage)
class UsersPage extends React.Component<any, any> {
    public render() {
        let label = this.props.loading ? "Loading..." : this.props.usersCount;
        return (
            <div>
                <div>Users Page!</div>
                <div>
                    <p>User count: <span id="user_count">{label}</span></p>
                </div>
            </div>
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
    };
};

let repoActions = { addRepoAsync, addRepoBegin, addRepoSuccess };

function mapStateToPropsReposPage(state: any) {
    return state.repos;
}

function mapDispatchToPropsReposPage(dispatch: Redux.Dispatch) {
    return { actions : bindActionCreators(repoActions, dispatch) };
}

// ******************************************************************************
// * REPOS PAGE COMPONENT
// ******************************************************************************
@connect(mapStateToPropsReposPage, mapDispatchToPropsReposPage)
class ReposPage extends React.Component<any, any> {
    public render() {
        let label = this.props.loading ? "Loading..." : this.props.reposCount;
        return (
            <div>
                <div>Repos Page!</div>
                <div>
                    <p>Repo count: <span id="repo_count">{label}</span></p>
                </div>
            </div>
        );
    }
}

// ******************************************************************************
// * ROUTES
// ******************************************************************************
const routes: JSX.Element = (
    <Route path="" component={AppLayout}>
        <IndexRoute component={Home} />
        <Route path="/users" component={UsersPage} />
        <Route path="/repos" component={ReposPage} />
    </Route>
);

// ******************************************************************************
// * REDUCERS
// ******************************************************************************
const defaultUsersState = Immutable.fromJS({
    loading: false,
    usersCount: 0
});

const usersReducer: Redux.Reducer = (previousState: any = defaultUsersState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_USER_BEGIN:
            return previousState.set("loading", true);
        case ACTION_TYPES.ADD_USER_SUCCESS:
            return previousState.merge({
                loading: false,
                reposCount: (previousState.get("usersCount") + 1)
            });
        default:
            return previousState;
    }
};

const defaultReposState = Immutable.fromJS({
    loading: false,
    reposCount: 0
});

const reposReducer: Redux.Reducer = (previousState: any = defaultReposState, action: any) => {
    switch (action.type) {
        case ACTION_TYPES.ADD_REPO_BEGIN:
            return previousState.set("loading", true);
        case ACTION_TYPES.ADD_REPO_SUCCESS:
            return previousState.merge({
                loading: false,
                reposCount: (previousState.get("reposCount") + 1)
            });
        default:
            return previousState;
    }
};

export { AppLayout, UsersPage, ReposPage, routes, usersReducer, reposReducer };
