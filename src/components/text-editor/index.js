import { h, Component } from "preact";
import initTinyMCE from "./initTinyMCE.js";

export default class TextEditor extends Component {

    componentDidMount() {
        initTinyMCE();
    }
    
    render() {
        return (
            <textarea id="editor"></textarea>
        );
    }
}