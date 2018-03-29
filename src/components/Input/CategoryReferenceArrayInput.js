import React, { Children } from 'react';
import FormInput from './FormInput';

type Props = {
    basePath: Object,
    input: Object,
    record: Object,
    resource: Object,
};

type State = {
    filter: Object,
};

class MyInput extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            filter: { category_id : props.record.category_id },
        };
    }

    render() {
        const {
            basePath,
            children,
            record,
            resource,
        } = this.props;

        const { filter } = this.state;

        return (
            <div>
                {Children.map(
                    children,
                    input =>
                        input ? (
                            <FormInput
                                basePath={basePath}
                                input={input}
                                record={record}
                                resource={resource}
                                filter={filter}
                            />
                        ) : null
                )}
            </div>
        )
    }
}

export default MyInput;
