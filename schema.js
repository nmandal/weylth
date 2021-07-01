const {
    GraphQLObjectType,
    GraphQLFloat,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLID
} = require('graphql');

const axios = require('axios');

const JSON_SERVER_ENDPOINT = `http://localhost:3000/accountBalances`;

const AccountBalanceType = new GraphQLObjectType({
    name: 'AccountBalance',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        wealthfrontCash: { type: GraphQLFloat },
        schwabChecking: { type: GraphQLFloat },
        vanguardRothIRA: { type: GraphQLFloat },
        schwabRoth401k: { type: GraphQLFloat },
        briWebHSA: { type: GraphQLFloat },
        vanguardRolloverIRA: { type: GraphQLFloat },
        wealthfrontIndividual: { type: GraphQLFloat },
        wealthfrontStrategy: { type: GraphQLFloat },
        vanguardBrokerage: { type: GraphQLFloat },
        cashApp: { type: GraphQLFloat },
        blockFi: { type: GraphQLFloat },
        gemini: { type: GraphQLFloat },
        coinbase: { type: GraphQLFloat }
    })
});

const AccountBalanceInputType = new GraphQLInputObjectType({
    name: 'AccountBalanceInput',
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLString },
        wealthfrontCash: { type: GraphQLFloat },
        schwabChecking: { type: GraphQLFloat },
        vanguardRothIRA: { type: GraphQLFloat },
        schwabRoth401k: { type: GraphQLFloat },
        briWebHSA: { type: GraphQLFloat },
        vanguardRolloverIRA: { type: GraphQLFloat },
        wealthfrontIndividual: { type: GraphQLFloat },
        wealthfrontStrategy: { type: GraphQLFloat },
        vanguardBrokerage: { type: GraphQLFloat },
        cashApp: { type: GraphQLFloat },
        blockFi: { type: GraphQLFloat },
        gemini: { type: GraphQLFloat },
        coinbase: { type: GraphQLFloat }
    })
});

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    fields: () => ({
        lastRow: { type: GraphQLInt },
        rows: { type: new GraphQLList(AccountBalanceType) },
    })
})

const SortModelType = new GraphQLInputObjectType({
    name: 'SortModel',
    fields: () => ({
        colId: { type: GraphQLString },
        sort: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        getRows: {
            type: ResponseType,
            args: {
                // ** non-nulls are required **
                startRow: { type: GraphQLNonNull(GraphQLInt) },
                endRow: { type: GraphQLNonNull(GraphQLInt) },
                sortModel: { type: new GraphQLList(SortModelType) }
                // filterModel: {}
                // groupKeys: []
                // pivotCols: []
                // pivotMode: false
                // rowGroupCols: []
                // valueCols: []
            },
            resolve(parentValue, args) {
                let endPoint = JSON_SERVER_ENDPOINT;
                const isRequestSorting = args.sortModel && args.sortModel.length > 0;

                if (isRequestSorting) {
                    const fields = [];
                    const orders = [];
                    args.sortModel.forEach(sM => {
                        fields.push(sM.colId);
                        orders.push(sM.sort)
                    });
                    // sorting
                    endPoint += `?_sort=${fields.join(',')}&_order=${orders.join(',')}`;
                    // starting from start row with a limit of endRow - startRows rows
                    endPoint += `&_start=${args.startRow}&_limit=${args.endRow - args.startRow}`;
                } else {
                    endPoint += `?_start=${args.startRow}&_end=${args.endRow}`;
                }

                return axios.get(endPoint)
                    .then(res => {
                        return {
                            rows: res.data,
                            lastRow: res.headers["x-total-count"]
                        }
                    })
                    .catch(err => console.log(err));
            }
        },
        readRow: {
            type: AccountBalanceType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parentValue, args) {
                return axios.get(JSON_SERVER_ENDPOINT + '/' + args.id)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createRow: {
            type: AccountBalanceType,
            args: {
                data: { type: GraphQLNonNull(AccountBalanceInputType) },
            },
            resolve(parentValue, args) {
                return axios.post(JSON_SERVER_ENDPOINT, args.data)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        updateRow: {
            type: AccountBalanceType,
            args: {
                data: { type: GraphQLNonNull(AccountBalanceInputType) },
            },
            resolve(parentValue, args) {
                return axios.patch(`${JSON_SERVER_ENDPOINT}/${args.data.id}`, args.data)
                    .then(res => res.data)
                    .catch(err => console.log(err));
            }
        },
        deleteRow: {
            type: AccountBalanceType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parentValue, args) {
                return axios.delete(`${JSON_SERVER_ENDPOINT}/${args.id}`)
                    .then(res => res.data)
                    .catch(err => console.log(err))
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})