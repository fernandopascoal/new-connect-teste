/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeUndefinedOrEmpty(obj: { [x: string]: any }) {
    const result = {};
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined && obj[key] !== '' && key !== 'id') {
        (result as any)[key] = obj[key];
      }
    });
    return result;
  }
  