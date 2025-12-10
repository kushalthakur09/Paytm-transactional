import { atom } from "recoil";

const localStorageEffect = (key) => ({setSelf, onSet}) => {
  const savedValue = localStorage.getItem(key);
  if (savedValue != null) {
    setSelf(JSON.parse(savedValue));
  }
  onSet((newValue, _, isReset) => {
    if (isReset) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};

const authAtom = atom({
  key: 'authAtom',
  default: { isLoggedIn: false, token: null, balance: 0, username: '', firstName: '', lastName: '' },
  effects_UNSTABLE: [localStorageEffect('authAtom')],
});

export default authAtom;