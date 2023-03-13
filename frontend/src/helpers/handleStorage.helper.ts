//

export const getItemStorage = (name: string = 'user_v1'): unknown =>
  JSON.parse(window.localStorage.getItem(name)!);

export const setItemStorage = (name = 'user_v1', data: unknown) =>
  window.localStorage.setItem(name, JSON.stringify(data));

export const removeItemStorage = (name = 'user_v1') =>
  window.localStorage.removeItem(name);

// especific
// const getDataCompany = (name = 'user_ES') => getItemStorage(name);
