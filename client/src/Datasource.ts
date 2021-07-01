import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { IServerSideGetRowsParams, IServerSideGetRowsRequest } from 'ag-grid-community';
// @ts-ignore
import { IAccountBalance, IServerSideDatasourceWithCRUD } from './interfaces';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

// startRow
// endRow
// filterModel: {}
// groupKeys: []
// pivotMode: false
// pivotCols: []
// rowGroupCols: []
// sortModel: []
// valueCols: []

export const createServerSideDatasource = function (): IServerSideDatasourceWithCRUD {
    return {
        getRows: function (params: IServerSideGetRowsParams) {
            console.log('Request', params.request)
            let {
                startRow,
                endRow,
                sortModel,
                // filterModel,
                // groupKeys,
                // pivotCols,
                // pivotMode,
                // rowGroupCols,
                // valueCols,
            }: IServerSideGetRowsRequest = params.request;

            sortModel = sortModel.length > 0 ? sortModel : undefined;
            const visibleColumnIds: string[] = params.columnApi.getAllDisplayedColumns().map(col => col.getColId());

            client.query({
                query: gql`
                    query GetRows($startRow: Int!, $endRow: Int!, $sortModel: [SortModel]) {
                        getRows(startRow: $startRow, endRow: $endRow, sortModel: $sortModel) {
                            lastRow
                            rows { 
                                id, 
                                ${visibleColumnIds.join('\n')}
                            }
                        }
                    }
                `,
                variables: {
                    startRow,
                    endRow,
                    sortModel
                }
            })
                .then(res => res.data.getRows)
                .then(({ lastRow, rows }: { lastRow: number, rows: IAccountBalance[] }) => {
                    console.log('Response', lastRow, rows);
                    params.successCallback(rows, lastRow);
                })
                .catch(err => {
                    console.log('Error', err);
                    params.failCallback();
                });
        },
        createRow(data: IAccountBalance): Promise<any> {
            return client.mutate({
                mutation: gql`
                    mutation CreateRow($data: AccountBalanceInput!) {
                        createRow(data: $data) {  
                            wealthfrontCash
                            schwabChecking
                            vanguardRothIRA
                            schwabRoth401k
                            briWebHSA
                            vanguardRolloverIRA
                            wealthfrontIndividual
                            wealthfrontStrategy
                            vanguardBrokerage
                            cashApp
                            blockFi
                            gemini
                            coinbase
                            date
                            id
                        }
                    }
                    `,
                variables: {
                    data
                }
            })
                .then(res => {
                    return res.data.createRow;
                })
                .catch(err => console.log('err', err));
        },
        readRow(id: string): Promise<any> {
            return client.query({
                query: gql`
                    query ReadRow($id: ID!) {
                        readRow(id: $id) {
                            wealthfrontCash
                            schwabChecking
                            vanguardRothIRA
                            schwabRoth401k
                            briWebHSA
                            vanguardRolloverIRA
                            wealthfrontIndividual
                            wealthfrontStrategy
                            vanguardBrokerage
                            cashApp
                            blockFi
                            gemini
                            coinbase
                            date
                            id
                        }
                    }
                    `,
                variables: {
                    id
                }
            })
                .then(res => {
                    return res.data.readRow;
                })
                .catch(err => console.log('err', err));
        },
        updateRow(data: IAccountBalance): Promise<any> {
            return client.mutate({
                mutation: gql`
                    mutation UpdateRow($data: AccountBalanceInput!) {
                        updateRow(data: $data) {  
                            wealthfrontCash
                            schwabChecking
                            vanguardRothIRA
                            schwabRoth401k
                            briWebHSA
                            vanguardRolloverIRA
                            wealthfrontIndividual
                            wealthfrontStrategy
                            vanguardBrokerage
                            cashApp
                            blockFi
                            gemini
                            coinbase
                            date
                            id
                        }
                    }
                    `,
                variables: {
                    data
                }
            })
                .then(res => {
                    return res.data.updateRow;
                })
                .catch(err => console.log('err', err));
        },
        deleteRow(id: string): Promise<any> {
            return client.mutate({
                mutation: gql`
                    mutation DeleteRow($id: ID!) {
                        deleteRow(id: $id) {                             
                            wealthfrontCash
                            schwabChecking
                            vanguardRothIRA
                            schwabRoth401k
                            briWebHSA
                            vanguardRolloverIRA
                            wealthfrontIndividual
                            wealthfrontStrategy
                            vanguardBrokerage
                            cashApp
                            blockFi
                            gemini
                            coinbase
                            date
                            id
                        }
                    }
                    `,
                variables: {
                    id
                }
            })
                .then(res => {
                    return res.data.deleteRow;
                })
                .catch(err => console.log('err', err));
        }
    };
}