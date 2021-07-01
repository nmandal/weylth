import {
    ColDef,
    SideBarDef,
    ColumnVisibleEvent,
    SortChangedEvent,
} from "ag-grid-community";
import { IAccountBalance } from './interfaces';


function currencyFormatter(currency: number, sign: string) {
    var sansDec = currency.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
  }

const columnDefs: ColDef[] = [
    { field: "date" },
    { 
        field: "wealthfrontCash",
        valueFormatter: params => currencyFormatter(params.data.wealthfrontCash, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    {
        field: "schwabChecking",
        valueFormatter: params => currencyFormatter(params.data.schwabChecking, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    }, 
    { 
        field: "vanguardRothIRA",
        valueFormatter: params => currencyFormatter(params.data.vanguardRothIRA, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "schwabRoth401k",
        valueFormatter: params => currencyFormatter(params.data.schwabRoth401k, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "briWebHSA",
        valueFormatter: params => currencyFormatter(params.data.briWebHSA, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "vanguardRolloverIRA",
        valueFormatter: params => currencyFormatter(params.data.vanguardRolloverIRA, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "wealthfrontIndividual",
        valueFormatter: params => currencyFormatter(params.data.wealthfrontIndividual, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "wealthfrontStrategy",
        valueFormatter: params => currencyFormatter(params.data.wealthfrontStrategy, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "vanguardBrokerage",
        valueFormatter: params => currencyFormatter(params.data.vanguardBrokerage, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "cashApp",
        valueFormatter: params => currencyFormatter(params.data.cashApp, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "blockFi",
        valueFormatter: params => currencyFormatter(params.data.blockFi, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "gemini",
        valueFormatter: params => currencyFormatter(params.data.gemini, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
    { 
        field: "coinbase",
        valueFormatter: params => currencyFormatter(params.data.coinbase, '$'),
        filter: 'agNumberColumnFilter',
        filterParams: {
          suppressAndOrCondition: true,
          filterOptions: ['greaterThan'],
      }
    },
];

const defaultColDef: ColDef = {
    sortable: true,
    resizable: true
}

const sideBar: SideBarDef = {
    toolPanels: [
        {
            id: 'columns',
            labelDefault: 'Columns',
            labelKey: 'columns',
            iconKey: 'columns',
            toolPanel: 'agColumnsToolPanel',
            toolPanelParams: {
                suppressRowGroups: true,
                suppressValues: true,
                suppressPivots: true,
                suppressPivotMode: true,
                suppressSideButtons: true,
                suppressColumnFilter: true,
                suppressColumnSelectAll: true,
                suppressColumnExpandAll: true,
            },
        },
    ],
    defaultToolPanel: 'columns',
}

const getRowNodeId = (data: IAccountBalance) => data.id;


const onColumnVisible = (params: ColumnVisibleEvent) => {
    params.api.sizeColumnsToFit();
    params.api.purgeServerSideCache();
}

const onSortChanged = (params: SortChangedEvent) => {
    params.api.purgeServerSideCache();
}

const rowSelection = "single";

const rowModelType = "serverSide";

export default {
    columnDefs,
    defaultColDef,
    sideBar,
    getRowNodeId,
    onColumnVisible,
    onSortChanged,
    rowModelType,
    rowSelection
}