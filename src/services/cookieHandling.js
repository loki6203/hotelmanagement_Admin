export const setCookie = (name, value) => {
  localStorage.setItem(name, (value));
};
export const getCookie = (name) => {
  return (localStorage.getItem(name));
};
export const deleteCookie = (name) => {
  setCookie(name, "", -1);
};
export const deleteAll = () => {
  localStorage.clear();
};
