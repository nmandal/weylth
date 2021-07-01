import { IServerSideDatasource } from 'ag-grid-community';

export interface IAccountBalance {
    id: string,
    date: string,
    wealthfrontCash: number,
    schwabChecking: number,
    vanguardRothIRA: number,
    schwabRoth401k: number,
    briWebHSA: number,
    vanguardRolloverIRA: number,
    wealthfrontIndividual: number,
    wealthfrontStrategy: number,
    vanguardBrokerage: number,
    cashApp: number,
    blockFi: number,
    gemini: number,
    coinbase: number
}

export interface IServerSideDatasourceWithCRUD extends IServerSideDatasource {
    createRow(data: IAccountBalance): Promise<any>,
    readRow(id: string): Promise<any>,
    updateRow(data: IAccountBalance): Promise<any>
    deleteRow(id: string): Promise<any>,
}

export interface IFormSubmitHandler {
    (data: IAccountBalance): void;
}