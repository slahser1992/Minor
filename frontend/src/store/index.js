import { createContext } from 'react';
import { configure } from 'mobx';

import accountStore from '@/store/account';
import EssayStore from '@/store/EssayStore';

configure({ enforceActions: 'observed' });

const accountStoreContext = createContext(new accountStore());
const essayStoreContext = createContext(new EssayStore());

export {
	accountStoreContext,
	essayStoreContext,
}