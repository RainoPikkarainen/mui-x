import * as React from 'react';
import PropTypes from 'prop-types';
import { DateIOFormats } from '@date-io/core/IUtils';
import { useThemeProps } from '@mui/material/styles';
import { MuiPickersAdapter } from '../internals/models';
import { PickersInputLocaleText } from '../locales';

export interface MuiPickersAdapterContextValue<TDate> {
  defaultDates: {
    minDate: TDate;
    maxDate: TDate;
  };

  utils: MuiPickersAdapter<TDate>;
  localeText: PickersInputLocaleText<TDate> | undefined;
}

export type MuiPickersAdapterContextNullableValue<TDate> = {
  [K in keyof MuiPickersAdapterContextValue<TDate>]: MuiPickersAdapterContextValue<TDate>[K] | null;
};

export const MuiPickersAdapterContext =
  React.createContext<MuiPickersAdapterContextNullableValue<any> | null>(null);

if (process.env.NODE_ENV !== 'production') {
  MuiPickersAdapterContext.displayName = 'MuiPickersAdapterContext';
}

export interface LocalizationProviderProps<TDate> {
  children?: React.ReactNode;
  /** DateIO adapter class function */
  dateAdapter?: new (...args: any) => MuiPickersAdapter<TDate>;
  /** Formats that are used for any child pickers */
  dateFormats?: Partial<DateIOFormats>;
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance?: any;
  /** Locale for the date library you are using
   */
  adapterLocale?: string | object;
  /**
   * Locale for components texts
   */
  localeText?: PickersInputLocaleText<TDate>;
}

/**
 * @ignore - do not document.
 */
export function LocalizationProvider<TDate>(inProps: LocalizationProviderProps<TDate>) {
  const { utils: parentUtils, localeText: parentLocaleText } = React.useContext(
    MuiPickersAdapterContext,
  ) ?? { utils: undefined, localeText: undefined };

  const props = useThemeProps({
    props: {
      localeText: parentLocaleText,
      ...inProps,
    },
    name: 'MuiLocalizationProvider',
  });

  const {
    children,
    dateAdapter: DateAdapter,
    dateFormats,
    dateLibInstance,
    adapterLocale,
    localeText,
  } = props;

  const utils = React.useMemo(() => {
    if (!DateAdapter) {
      if (parentUtils) {
        return parentUtils;
      }

      return null;
    }

    return new DateAdapter({
      locale: adapterLocale,
      formats: dateFormats,
      instance: dateLibInstance,
    });
  }, [DateAdapter, adapterLocale, dateFormats, dateLibInstance, parentUtils]);

  const defaultDates: MuiPickersAdapterContextNullableValue<TDate>['defaultDates'] =
    React.useMemo(() => {
      if (!utils) {
        return null;
      }

      return {
        minDate: utils.date('1900-01-01T00:00:00.000')!,
        maxDate: utils.date('2099-12-31T00:00:00.000')!,
      };
    }, [utils]);

  const contextValue: MuiPickersAdapterContextNullableValue<TDate> = React.useMemo(() => {
    return {
      utils,
      defaultDates,
      localeText,
    };
  }, [defaultDates, utils, localeText]);

  return (
    <MuiPickersAdapterContext.Provider value={contextValue}>
      {children}
    </MuiPickersAdapterContext.Provider>
  );
}

LocalizationProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Locale for the date library you are using
   */
  adapterLocale: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.node,
  /**
   * DateIO adapter class function
   */
  dateAdapter: PropTypes.func,
  /**
   * Formats that are used for any child pickers
   */
  dateFormats: PropTypes.shape({
    dayOfMonth: PropTypes.string,
    fullDate: PropTypes.string,
    fullDateTime: PropTypes.string,
    fullDateTime12h: PropTypes.string,
    fullDateTime24h: PropTypes.string,
    fullDateWithWeekday: PropTypes.string,
    fullTime: PropTypes.string,
    fullTime12h: PropTypes.string,
    fullTime24h: PropTypes.string,
    hours12h: PropTypes.string,
    hours24h: PropTypes.string,
    keyboardDate: PropTypes.string,
    keyboardDateTime: PropTypes.string,
    keyboardDateTime12h: PropTypes.string,
    keyboardDateTime24h: PropTypes.string,
    minutes: PropTypes.string,
    month: PropTypes.string,
    monthAndDate: PropTypes.string,
    monthAndYear: PropTypes.string,
    monthShort: PropTypes.string,
    normalDate: PropTypes.string,
    normalDateWithWeekday: PropTypes.string,
    seconds: PropTypes.string,
    shortDate: PropTypes.string,
    weekday: PropTypes.string,
    weekdayShort: PropTypes.string,
    year: PropTypes.string,
  }),
  /**
   * Date library instance you are using, if it has some global overrides
   * ```jsx
   * dateLibInstance={momentTimeZone}
   * ```
   */
  dateLibInstance: PropTypes.any,
  /**
   * Locale for components texts
   */
  localeText: PropTypes.object,
} as any;
