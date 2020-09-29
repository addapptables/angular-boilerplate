import * as _ from 'lodash';

export function removeEmptyOrNil(object: any) {
  if (typeof object === 'object') {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const removeEmptyParams = _(object).omit(_.isUndefined).value();
    const params = _.mapValues(removeEmptyParams, (v) => {
      if (v instanceof Date) {
        return v.toUTCString();
      }
      if (Array.isArray(v)) {
        return v;
      }
      if (typeof v === 'object') {
        return removeEmptyOrNil(v);
      }
      return String(v);
    });
    return params;
  }
  return object;
}
