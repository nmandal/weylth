import React, { useState } from 'react';
import { IAccountBalance, IFormSubmitHandler } from './interfaces';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { v4 as uuid } from "uuid";

interface AccountBalanceFormProps {
    data: IAccountBalance,
    submit: IFormSubmitHandler,
    hide: () => void,
}

const AccountBalanceForm = (props: AccountBalanceFormProps): React.ReactElement => {
    const [show, setShow] = useState<Boolean>(true);

    const handleClose = () => {
        setShow(false);
        props.hide();
    }

    // const handleShow = () => setShow(true);

    let id: any;
    let date: any;
    let wealthfrontCash: any;
    let schwabChecking: any;
    let vanguardRothIRA: any;
    let schwabRoth401k: any;
    let briWebHSA: any;
    let vanguardRolloverIRA: any;
    let wealthfrontIndividual: any;
    let wealthfrontStrategy: any;
    let vanguardBrokerage: any;
    let cashApp: any;
    let blockFi: any;
    let gemini: any;
    let coinbase: any;


    if (props.data) {
        ({
            id,
            date,
            wealthfrontCash,
            schwabChecking,
            vanguardRothIRA,
            schwabRoth401k,
            briWebHSA,
            vanguardRolloverIRA,
            wealthfrontIndividual,
            wealthfrontStrategy,
            vanguardBrokerage,
            cashApp,
            blockFi,
            gemini,
            coinbase
        } = props.data);
    } else {
        id = uuid();
        date = '';
        wealthfrontCash = 0.00;
        schwabChecking = 0.00;
        vanguardRothIRA = 0.00;
        schwabRoth401k = 0.00;
        briWebHSA = 0.00;
        vanguardRolloverIRA = 0.00;
        wealthfrontIndividual = 0.00;
        wealthfrontStrategy = 0.00;
        vanguardBrokerage = 0.00;
        cashApp = 0.00;
        blockFi = 0.00;
        gemini = 0.00;
        coinbase = 0.00;
    }

    const [dateForm, setDateForm] = useState<string>(date)
    const [wealthfrontCashForm, setWealthfrontCashForm] = useState<number>(wealthfrontCash)
    const [schwabCheckingForm, setSchwabCheckingForm] = useState<number>(schwabChecking)
    const [vanguardRothIRAForm, setVanguardRothIRAForm] = useState<number>(vanguardRothIRA)
    const [schwabRoth401kForm, setSchwabRoth401kForm] = useState<number>(schwabRoth401k)
    const [briWebHSAForm, setBriWebHSAForm] = useState<number>(briWebHSA)
    const [vanguardRolloverIRAForm, setVanguardRolloverIRAForm] = useState<number>(vanguardRolloverIRA)
    const [wealthfrontIndividualForm, setWealthfrontIndividualForm] = useState<number>(wealthfrontIndividual)
    const [wealthfrontStrategyForm, setWealthfrontStrategyForm] = useState<number>(wealthfrontStrategy)
    const [vanguardBrokerageForm, setVanguardBrokerageForm] = useState<number>(vanguardBrokerage)
    const [cashAppForm, setCashAppForm] = useState<number>(cashApp)
    const [blockFiForm, setBlockFiForm] = useState<number>(blockFi)
    const [geminiForm, setGeminiForm] = useState<number>(gemini)
    const [coinbaseForm, setCoinbaseForm] = useState<number>(coinbase)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data: IAccountBalance = {
            id,
            date: dateForm,
            wealthfrontCash: wealthfrontCashForm,
            schwabChecking: schwabCheckingForm,
            vanguardRothIRA: vanguardRothIRAForm,
            schwabRoth401k: schwabRoth401kForm,
            briWebHSA: briWebHSAForm,
            vanguardRolloverIRA: vanguardRolloverIRAForm,
            wealthfrontIndividual: wealthfrontIndividualForm,
            wealthfrontStrategy: wealthfrontStrategyForm,
            vanguardBrokerage: vanguardBrokerageForm,
            cashApp: cashAppForm,
            blockFi: blockFiForm,
            gemini: geminiForm, 
            coinbase: coinbaseForm,
        };
        props.submit(data);
        handleClose();
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Account Balance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">ID</Form.Label>
                            <Col sm="10">
                                <Form.Control plaintext readOnly defaultValue={id} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Date</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Enter date..."
                                    required
                                    value={dateForm}
                                    onChange={e => setDateForm(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Wealthfront Cash</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    step="0.1"
                                    placeholder="Enter balance..."
                                    required
                                    value={wealthfrontCashForm}
                                    onChange={e => setWealthfrontCashForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Schwab Checking</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={schwabCheckingForm}
                                    onChange={e => setSchwabCheckingForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Vanguard Roth IRA</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={vanguardRothIRAForm}
                                    onChange={e => setVanguardRothIRAForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Schwab Roth 401(k)</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={schwabRoth401kForm}
                                    onChange={e => setSchwabRoth401kForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">BriWeb HSA</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={briWebHSAForm}
                                    onChange={e => setBriWebHSAForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Vanguard Rollover IRA</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={vanguardRolloverIRAForm}
                                    onChange={e => setVanguardRolloverIRAForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Wealthfront Individual</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={wealthfrontIndividualForm}
                                    onChange={e => setWealthfrontIndividualForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Wealthfront Strategy</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={wealthfrontStrategyForm}
                                    onChange={e => setWealthfrontStrategyForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Vanguard Brokerage</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={vanguardBrokerageForm}
                                    onChange={e => setVanguardBrokerageForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Cash App</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={cashAppForm}
                                    onChange={e => setCashAppForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">BlockFi</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={blockFiForm}
                                    onChange={e => setBlockFiForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Gemini</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={geminiForm}
                                    onChange={e => setGeminiForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2">Coinbase</Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="number"
                                    placeholder="Enter balance..."
                                    required
                                    value={coinbaseForm}
                                    onChange={e => setCoinbaseForm(parseFloat(e.target.value))} />
                            </Col>
                        </Form.Group>
                        <Button
                            style={{ display: 'block', margin: 'auto' }}
                            variant="primary"
                            type="submit"
                        >Submit</Button>
                    </Form>

                </Modal.Body>
                {/* <Modal.Footer> */}

                {/* </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default AccountBalanceForm;