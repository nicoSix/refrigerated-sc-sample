import React, { Component } from 'react';
import UserSelectorFromRole from '../../components/UserSelectorFromRole/UserSelectorFromRole';
import { postContractAction } from '../../../js/workbenchApi';
import './IngestTelemetryModalForm.css';
import '../../../App.css';

/**
 * IngestTelemetryModalForm : this is the content inside the modal to execute the action Ingest Telemetry
 *
 * @version 1.0.0
 * @author [Nicolas Six](https://github.com/nicoSix)
 */
class IngestTelemetryModalForm extends Component {
    constructor(props){
        super(props);
        this.parent = props.parent;
    };

    /**
     * ingestTelemetry: executed after clicking on Submit, send the form data to a function which will execute a transaction to post the action
     */
    ingestTelemetry() {
        var params = [
            {
                "name": "humidity",
                "value": this.refs.humidityInput.value,
                "workflowFunctionParameterId": 0,
            },
            {
                "name": "temperature",
                "value": this.refs.temperatureInput.value,
                "workflowFunctionParameterId": 1,
            },
            {
                "name": "timestamp",
                "value": this.refs.timestampInput.value,
                "workflowFunctionParameterId": 2,
            }
        ]

        this.parent.setState({ displayLoadingGif: true });

        postContractAction(this.parent.contractId, this.parent.state.actionId, params).then(contractReq => {
            this.parent.closeModal();
            this.parent.setState({ displayLoadingGif: false });
        });
    }

    render() {
        return (
            <div id="ingestTelemetryModalForm">
                <h2>Ingest Telemetry (manual)</h2><br/>
                <div className="form-group">
                    <label htmlFor="device">Device</label>
                    <UserSelectorFromRole ref="device" roleId='3' innerRole={ true } contractId={ this.parent.contractId }/>
                    <label htmlFor="temperatureInput">Temperature</label>
                    <input type="number" defaultValue="0" className="form-control" ref="temperatureInput"/>
                    <label htmlFor="humidityInput">Humidity</label>
                    <input type="number" defaultValue="0" className="form-control" ref="humidityInput"/>
                    <label htmlFor="timestampInput">Timestamp</label>
                    <input type="number" defaultValue="0" className="form-control" ref="timestampInput"/>
                    <br/>
                    <div align="center">
                        <button className="btn btn-smoothblue" onClick={ this.ingestTelemetry.bind(this) }>Submit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default IngestTelemetryModalForm;