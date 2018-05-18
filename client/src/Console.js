import React, {
    Component
} from 'react';
import './Console.css';
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'

class ConsoleEntry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showData: false
        };
    }

    render() {
        const id = < span className = "requestId" > {
            this.props.message.requestId ? `id: ${this.props.message.requestId}` : ''
        } < /span>;

        let dataToDisplay = '';

        if (this.props.message.data && this.state.showData) {
            dataToDisplay = < ReactJsonSyntaxHighlighter obj = {
                this.props.message.data
            }
            />;
        }

        const showDataButton = (this.props.message.data && < button onClick = {
                () => {
                    this.setState((state) => {
                        state.showData = !state.showData;
                        return state;
                    });
                }
            } > {
                this.state.showData ? 'Hide' : 'Show'
            }
            data <
            /button>) || '';

            return <li >
                <
                span > {
                    this.props.date.toISOString()
                } > {
                    id
                } < span className = {
                    this.props.message.type
                } > {
                    this.props.message.msg
                } < /span> {showDataButton} {
                    dataToDisplay
                } <
                /span> <
                /li>;
        }
    }

    function Console(props) {
        const messages = props.messages && props.messages.map((m, i) =>
            <
            ConsoleEntry date = {
                new Date()
            }
            key = {
                i + new Date()
            }
            message = {
                m
            }
            />
        );

        return ( <
            div className = "console" > {
                messages
            } <
            /div>
        );
    }

    export default Console;
