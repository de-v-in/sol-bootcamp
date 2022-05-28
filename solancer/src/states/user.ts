import { atom } from 'recoil';

const userModeAtom = atom<TUserMode>({
  key: 'userMode',
  default: 'Unknown',
});

export { userModeAtom };
