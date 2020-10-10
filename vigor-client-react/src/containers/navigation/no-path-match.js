import React, { Component } from "react";

export default class NoPathMatch extends Component {
    componentDidMount() {
        this.props.history.push("/");
    }

    render() {
        return <h1>narp</h1>;
    }
};