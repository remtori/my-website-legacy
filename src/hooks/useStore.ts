import { useState, useContext, useLayoutEffect } from 'preact/hooks';
import { storeCtx, StoreState } from '../store';

function mapStateToProps<T extends Array<keyof StoreState>>(keys: T, state: StoreState): Pick<StoreState, T[number]> {
	const obj: any = {};
	for (const k of keys) obj[k] = state[k];
	return obj;
}

export default function useStore<T extends Array<keyof StoreState>>(keys: T) {
	const store = useContext(storeCtx);
	const [currentState, setCurrentState] = useState(
		mapStateToProps(keys, store.getState())
	);

	useLayoutEffect(() => {
		const update = () => {
			const mapped = mapStateToProps(keys, store.getState());

			for (const i in mapped) {
				// @ts-ignore
				if (mapped[i] !== currentState[i]) {
					return setCurrentState(mapped);
				}
			}

			for (const i in currentState) {
				if (!(i in mapped)) {
					return setCurrentState(mapped);
				}
			}
		};

		const dispose = store.subscribe(update);
		return dispose;
	}, [currentState]);

	return {
		state: currentState,
		update: (s: any) => store.setState(Object.assign(store.getState, s))
	};
}
