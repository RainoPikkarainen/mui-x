import { GridColumnApi } from './gridColumnApi';
import { GridColumnMenuApi } from './gridColumnMenuApi';
import { GridCoreApi, GridCorePrivateApi } from './gridCoreApi';
import { GridClipboardApi } from './gridClipboardApi';
import { GridCsvExportApi } from './gridCsvExportApi';
import { GridDensityApi } from './gridDensityApi';
import { GridEditingApi } from './gridEditingApi';
import { GridFilterApi } from './gridFilterApi';
import { GridFocusApi } from './gridFocusApi';
import { GridLocaleTextApi } from './gridLocaleTextApi';
import type { GridParamsApi } from './gridParamsApi';
import { GridPreferencesPanelApi } from './gridPreferencesPanelApi';
import { GridPrintExportApi } from './gridPrintExportApi';
import { GridDisableVirtualizationApi } from './gridDisableVirtualizationApi';
import { GridRowApi } from './gridRowApi';
import { GridRowsMetaApi } from './gridRowsMetaApi';
import { GridRowSelectionApi } from './gridRowSelectionApi';
import { GridSortApi } from './gridSortApi';
import { GridStateApi, GridStatePrivateApi } from './gridStateApi';
import { GridLoggerApi } from './gridLoggerApi';
import { GridScrollApi } from './gridScrollApi';
import { GridVirtualScrollerApi } from './gridVirtualScrollerApi';
import type { GridPipeProcessingApi } from '../../hooks/core/pipeProcessing';
import { GridColumnSpanningApi } from './gridColumnSpanning';
import type { GridStrategyProcessingApi } from '../../hooks/core/strategyProcessing';
import type { GridDimensionsApi } from '../../hooks/features/dimensions';
import type { GridPaginationApi } from '../../hooks/features/pagination';
import type { GridStatePersistenceApi } from '../../hooks/features/statePersistence';
import { GridColumnGroupingApi } from './gridColumnGroupingApi';
import type { GridInitialStateCommunity, GridStateCommunity } from '../gridStateCommunity';

export interface GridApiCommon<
  GridState extends GridStateCommunity = any,
  GridInitialState extends GridInitialStateCommunity = any,
> extends GridCoreApi,
    GridLoggerApi,
    GridPipeProcessingApi,
    GridStrategyProcessingApi,
    GridDensityApi,
    GridDimensionsApi,
    GridRowApi,
    GridRowsMetaApi,
    GridEditingApi,
    GridParamsApi,
    GridColumnApi,
    GridRowSelectionApi,
    GridSortApi,
    GridPaginationApi,
    GridCsvExportApi,
    GridFocusApi,
    GridFilterApi,
    GridColumnMenuApi,
    GridPreferencesPanelApi,
    GridPrintExportApi,
    GridDisableVirtualizationApi,
    GridVirtualScrollerApi,
    GridLocaleTextApi,
    GridClipboardApi,
    GridScrollApi,
    GridColumnSpanningApi,
    GridStateApi<GridState>,
    GridStatePersistenceApi<GridInitialState>,
    GridColumnGroupingApi {}

export interface GridPrivateOnlyApiCommon<
  Api extends GridApiCommon,
  PrivateApi extends GridPrivateApiCommon,
> extends GridCorePrivateApi<Api, PrivateApi>,
    GridStatePrivateApi<PrivateApi['state']> {}

export interface GridPrivateApiCommon
  extends GridApiCommon,
    GridPrivateOnlyApiCommon<GridApiCommon, GridPrivateApiCommon> {}
