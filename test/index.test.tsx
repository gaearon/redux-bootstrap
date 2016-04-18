/// <reference path="../src/interfaces/interfaces.d.ts" />

import thunk from "redux-thunk";
import * as createLogger from "redux-logger";
import * as $ from "jquery";
import { expect } from "chai";
import bootstrap from "../src/index";
import { getRoutes, getReducers } from "./stubs";
import * as ReactTestUtils from "react-addons-test-utils";

history.pushState({}, "", "/");
$("body").append(`<div id="root"/><div>`);

describe("redux-bootstrap", () => {

    it("Should throw if the wrong configuration is used.", () => {

        let b: any = bootstrap;

        let throw1 = () => { b(); };

        let throw2 = () => {
            b({
                routes: getRoutes()
            });
        };

        let throw3 = () => {
            b({
                reducers: getReducers()
            });
        };

        expect(throw1).to.throw("Null argument options.");
        expect(throw2).to.throw("Invalid configuration field: reducers.");
        expect(throw3).to.throw("Invalid configuration field: routes.");

    });

    describe("Should be able to bootstrap applications.", () => {

        bootstrap({
            container: "root",
            initialState: {},
            middlewares: [thunk, createLogger()],
            reducers: getReducers(),
            routes: getRoutes()
        });

        it("Should be able to render the home page.", (done) => {
            setTimeout(() => {
                expect($("#home_page_title").text()).eql("Home Page!");
                done();
            }, 20);
        });

        it("Should be able to navigate to a page.", (done) => {
            let userLink = document.getElementById("link_to_users");
            ReactTestUtils.Simulate.click(userLink);
            setTimeout(() => {
                expect($("#users_page_title").text()).eql("Users Page!");
                done();
            }, 1000);
        });

        it("Should be able to another to a page.", (done) => {
            $("#link_to_users").trigger("click");
            setTimeout(() => {
                expect($("#repos_page_title").text()).eql("Repos Page!");
                done();
            }, 1000);
        });

        it("Should be able to return to the home page.", (done) => {
            $("#link_to_home").trigger("click");
            setTimeout(() => {
                expect($("#repos_page_title").text()).eql("Home Page!");
                done();
            }, 1000);
        });

        it("Should be able to interact.", (done) => {

            // go to user page
            $("#link_to_users").trigger("click");

            setTimeout(() => {

                // check counter and page title
                expect($("#users_page_title").text()).eql("Users Page!");
                expect($("#user_count").text()).eql("0");

                // trigger increase counter
                $("#add_user_btn").trigger("click");

                // show loadding
                setTimeout(() => {
                    expect($("#user_count").text()).eql("Loading...");
                }, 100);

                // update counter
                setTimeout(() => {
                    expect($("#user_count").text()).eql("1");
                    done();
                }, 300);

            }, 1000);

        });

    });

});
