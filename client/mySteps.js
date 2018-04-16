import React from 'react';

import { Steps, Button, Message, Icon } from 'antd';
const Step = Steps.Step;

const steps = [{
    title: 'First',
    content: 'First-content',
    icon: 'user',
}, {
    title: 'Second',
    content: 'Second-content',
    icon: 'solution',
}, {
    title: 'Last',
    content: 'Last-content',
    icon: 'smile-o',
}]

class MySteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    render() {
        const { current } = this.state;

        return (
            <div>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon} />} />)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => messange.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ margingLeft: 8}} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </div>
        )
    }
}

export default MySteps;