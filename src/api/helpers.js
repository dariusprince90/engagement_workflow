import errorLoggingHelper from '../appInsights/errorLoggingHelper';
import ApiGeneralException from './ApiGeneralException';
import ApiValidationException from './ApiValidationException';
import DataConcurrencyException from './DataConcurrencyException';

export const handleApiError = (error) => {
  errorLoggingHelper.logApiError(error);

  if (error.response?.data?.title === 'One or more validation errors occurred.') {
    throw new ApiValidationException(error);
  } else if (error.response?.status === 412) {
    throw new DataConcurrencyException(error);
  } else {
    throw new ApiGeneralException(error);
  }
};
