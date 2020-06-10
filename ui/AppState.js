// Libraries
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

// todo: useReducer will work better as this grows, keep simple for now with old fashion useState and prop passing :/

// todo: inject token at build time
const url = new URL(window.location.href);
const token = url.searchParams.get("token");
const API_TOKEN = token ? token : 'pk_2d0ac927c35f4fe4a8f2cd81c51defd8';

const REFRESH_RATE = 60; // seconds

// initial set of portfolios
const portfolios = {
    'portfolio-1': { id: 'portfolio-1', 'name': 'My Portfolio', 'symbols': ['TSLA', 'GOOGL']},
    'portfolio-2': { id: 'portfolio-2', 'name': 'Tech', 'symbols': ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'FB', 'TWTR', 'NFLX', 'BABA', 'NVDA']},
    'portfolio-3': { id: 'portfolio-3', 'name': 'Autos', 'symbols': ['F', 'GM', 'FCAU', 'TM', 'HMC', 'TSLA']}
};

// select symbols
const getSymbols = portfolios => Object.values(portfolios)
    .reduce((acc, portfolio) => acc.concat(portfolio.symbols), []) // get all symbols
    .filter((s, i, a) => a.indexOf(s) === i); // filter out duplicates

const initialState = {
    portfolios,
    refreshRate: REFRESH_RATE,
    quotes: {},
    details: {},
    updatedAt: (new Date()).toLocaleString()
};

const BASE_URL = 'https://cloud.iexapis.com/stable/stock/market/batch';

// todo: optimize e.g. memo, hoist helpers, extrct setState updaters, etc.
export const AppState = ({ children }) => {
    const [state, setState] = useState(initialState);

    // todo: turn fetchIt into a client, hoist out of this container
    const fetchQuotes = symbols => {
        const FILTERS = ['latestPrice', 'change', 'changePercent', 'marketCap', 'companyName'];
        const url = `${BASE_URL}?types=quote&symbols=${symbols.join(',')}&filter=${FILTERS.join(',')}&token=${API_TOKEN}`;
        const updatedAt = (new Date()).toLocaleString(); // todo: get actual updatedAt from API
        fetch(url)
            .then(res => res.json())
            .then(quotes => {
                setState(prev => ({ ...prev, updatedAt, quotes }));
            });
    };

    const fetchDetails = symbol => {
        const url = `${BASE_URL}?types=quote,chart&symbols=${symbol}&token=${API_TOKEN}&chartByDay=true&range=1y`;
        const updatedAt = (new Date()).toLocaleString(); // todo: get actual updatedAt from API
        fetch(url)
            .then(res => res.json())
            .then(details => {
                setState(prev => ({ ...prev, updatedAt, details: { ...prev.details, ...details } }));
            });
    };

    useEffect(() => {
        fetchQuotes(getSymbols(state.portfolios));
        // todo: polling API is icky, use event sourcing or websocket instead
        const interval = setInterval(() => {
            fetchQuotes(getSymbols(state.portfolios));
        }, REFRESH_RATE * 1000);
        return () => clearInterval(interval);
      }, [state.portfolios]);

    // todo: memoize, persist using indexedDB to remember user stored values
    // todo: this is getting ugly, move to reducer
    const addTicker = (id, ticker) => {
        setState(prev => {
            const prevPortfolios = prev.portfolios;
            const { name, symbols } = prevPortfolios[id];
            return {
                ...prev,
                portfolios: {
                    ...prevPortfolios,
                    // todo: de-duplicate symbols
                    [id]: { id, name, symbols: [...symbols, ticker] }
                }
            };
        });
    };

    return h(children[0], { state, addTicker, fetchDetails });
};
