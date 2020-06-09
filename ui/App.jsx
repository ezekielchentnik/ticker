// Libraries
import { h } from "preact";

import { formatChange, formatChangePercent, formatMarketCap, formatQuote, calculateStyles, isNull } from "./helpers.js";

const LineChart = () => (<div>hi</div>);

const Details = ({ symbol, quote }) => {
    // todo: enhance line chart
    return (
        <div id={`${symbol}`} class="modal-window">
            <div>
                <a href="#" title="Close" class="modal-close">Close</a>
                <h1>{symbol}</h1>
                <div class="modal-details">{isNull(quote) ? "fetching ..." : JSON.stringify(quote, null, 2)}</div>
                {quote && <div class="modal-details"><LineChart quote={quote} /></div>}
                <div><small>Check out</small></div>
                <a href={`https://iextrading.com/apps/stocks/${symbol}`} target="_blank">👉 {symbol} on IEX</a>
            </div>
        </div>
    );
}

// todo: add expand/collapse icon
const Portfolio = ({ portfolio, quotes, details, addTicker, fetchDetails }) => (
    <details open>
        <summary><h2>{portfolio.name}</h2></summary>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class="stock-price">Last</th>
                    <th class="stock-change">Change</th>
                    <th class="stock-change-pct">Change%</th>
                    <th class="stock-mkt-cap">Mkt Cap</th>
                    <th class="stock-more"></th>
                </tr>
            </thead>
            <tbody>
                {portfolio.symbols.map(symbol => {
                    let data = quotes[symbol];
                    if (typeof(data) === 'undefined' || !data.quote.latestPrice) {
                        return (
                            <tr>
                                <td class="stock-symbol">
                                    <a>{symbol}</a>
                                </td>
                                <td class="stock-price"></td>
                                <td class="stock-change"></td>
                                <td class="stock-change-pct"></td>
                                <td class="stock-mkt-cap"></td>
                            </tr>
                        );
                    }

                    const formattedPrice = formatQuote(Number(data.quote.latestPrice));
                    const formattedChange = formatChange(data.quote.change);
                    const formattedChangePercent = formatChangePercent(data.quote.changePercent);
                    const formattedMarketCap = formatMarketCap(data.quote.marketCap);
                    const styles = calculateStyles({ changePercent: data.quote.changePercent });

                    return (
                        <tr>
                            <td class="stock-symbol">
                                <a href={`#${symbol}`} onClick={() => fetchDetails(symbol)} title={data.quote.companyName}>{symbol}</a>
                                <Details symbol={symbol} quote={details[symbol]} />
                            </td>
                            <td class="stock-price" style={styles}>{formattedPrice}</td>
                            <td class="stock-change" style={styles}>{formattedChange}</td>
                            <td class="stock-change-pct" style={styles}>{formattedChangePercent}</td>
                            <td class="stock-mkt-cap" style={styles}>{formattedMarketCap}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <form onSubmit={e => {
            e.preventDefault();
            // todo: useRef, cheating here
            const { value } = e.target.children[0];
            addTicker(portfolio.id, value);
        }}>
            <input type="text" placeholder="Enter symbol e.g. GOOGL" />
            <button>Add</button>
        </form>
    </details>
);

export const App = ({ state: { portfolios, refreshRate, quotes, details, updatedAt }, addTicker, fetchDetails }) => {
    return (     
        <div class="stocks-container">
            <p>Updated at: {updatedAt} - updates every {refreshRate} seconds</p>
            {Object.values(portfolios)
                .map(portfolio => (
                    <Portfolio
                        portfolio={portfolio}
                        quotes={quotes}
                        details={details}
                        addTicker={addTicker}
                        fetchDetails={fetchDetails}
                    />
                ))}
        </div>
    );
};
