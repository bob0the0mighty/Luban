import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from '../../../lib/i18n';
import { actions as editorActions } from '../../../flux/editor';


class ReliefParameters extends PureComponent {
    static propTypes = {
        invert: PropTypes.bool,
        disabled: PropTypes.bool,
        updateSelectedModelConfig: PropTypes.func.isRequired
    };

    state = {
        expanded: true
    };

    actions = {
        onToggleInvert: () => {
            const invert = !this.props.invert;
            this.props.updateSelectedModelConfig({ invert });
        }
    };

    render() {
        const { invert, disabled } = this.props;

        return (
            <div>
                {this.state.expanded && (
                    <React.Fragment>
                        <div className="sm-parameter-row">
                            <span className="sm-parameter-row__label">{i18n._('Invert')}</span>
                            <input
                                disabled={disabled}
                                className="sm-parameter-row__checkbox"
                                type="checkbox"
                                defaultChecked={invert}
                                onChange={this.actions.onToggleInvert}
                            />
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { config } = state.cnc;
    const { invert } = config;
    return {
        invert
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateSelectedModelConfig: (params) => dispatch(editorActions.updateSelectedModelConfig('cnc', params))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReliefParameters);
