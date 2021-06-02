import React from "react";
import ReactDOM from "react-dom";
import { Button } from "antd";
import "./app.css";
import "./app.less";
import './app.scss'

class App extends React.Component {
    public render() {
        return (
            <div>
                <Button>hello antd</Button>
            </div>
        );
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
