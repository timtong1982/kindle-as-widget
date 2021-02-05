import { Second } from './second'

type ActionType<T> = {
    type: string
    payload: T
}

type ReducerFunction<S> = (state: S, action: ActionType<unknown>) => S

type ReducerHanlderType<S> = {
    [key: string]: ReducerFunction<S>
}

type ReducerMap<T> = {
    [K in keyof T]: ReducerFunction<unknown>
}

const createAction = <T extends { [key: string]: string }>(
    actionMap: T,
    prefix: string
): Readonly<T> => {
    Object.keys(actionMap).forEach((key: string) => {
        ;(actionMap as any)[key] = `${prefix}_${actionMap[key]}`
    })
    return actionMap
}

const createReducer = <T>(
    initialState: T,
    reducerMap: ReducerHanlderType<T>
): ((state: T, action: ActionType<unknown>) => T) => {
    return (state: T, action: ActionType<unknown>): T => {
        if (state === undefined) {
            return initialState
        }

        const childReducer = reducerMap[action.type]
        if (childReducer) {
            return childReducer(state, action)
        }

        return state
    }
}

const initialAppState = {
    hour: 0,
    minute: 0,
    second: 0,
}

type AppReducerType = typeof initialAppState

const appActionTypes = createAction(
    {
        SET_TIME: 'SET TIME',
        SET_TICK: 'SET TICK',
    },
    '[APP]'
)

const appActions = {
    setTime: (h: number, m: number, s: number) => ({
        type: appActionTypes.SET_TIME,
        payload: { h, m, s },
    }),
    setTick: () => ({
        type: appActionTypes.SET_TICK,
        payload: {},
    }),
}

type InferActionType<T, K extends keyof T> = T[K] extends (
    ...args: infer _P
) => ActionType<infer R>
    ? ActionType<R>
    : never

const appReducer = createReducer(initialAppState, {
    [appActionTypes.SET_TIME]: (
        state: AppReducerType,
        action: InferActionType<typeof appActions, 'setTime'>
    ) => {
        return {
            ...state,
            hour: action.payload.h,
            minute: action.payload.m,
            second: action.payload.s,
        }
    },
    [appActionTypes.SET_TICK]: (
        state: AppReducerType,
        action: InferActionType<typeof appActions, 'setTick'>
    ) => {
        let nextSecond = state.second + 1
        let nextMinute = state.minute
        let nextHour = state.hour
        if (nextSecond > 59) {
            nextSecond %= 60
            nextMinute += 1
            if (nextMinute > 59) {
                nextMinute %= 60
                nextHour += 1
                if (nextHour > 23) {
                    nextHour %= 24
                }
            }
        }
        return {
            ...state,
            hour: nextHour,
            minute: nextMinute,
            second: nextSecond,
        }
    },
})

export { initialAppState, appActions, appReducer }
