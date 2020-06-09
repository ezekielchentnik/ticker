export function isNull(value) {
    return (value === null || value === undefined);
}

export function formatChange(value) {
    return isNull(value) ? "" : value.toLocaleString('en', {'minimumFractionDigits': 2});
}

export function formatChangePercent(value) {
    return isNull(value) ? "" : (value * 100).toFixed(1) + '%';
}

export function formatQuote(value) {
    return value.toLocaleString('en', {
        'minimumFractionDigits': 2,
        'style': 'currency',
        'currency': 'USD'
    });
}

export function formatMarketCap(marketCap) {
    if (marketCap === null || marketCap === 0 || marketCap === undefined) {
        return '';
    }

    let value, suffix;
    if (marketCap >= 1e12) {
        value = marketCap / 1e12;
        suffix = 'T';
    } else if (marketCap >= 1e9) {
        value = marketCap / 1e9;
        suffix = 'B';
    } else {
        value = marketCap / 1e6;
        suffix = 'M';
    }

    let digits = value < 10 ? 1 : 0;

    return '$' + value.toFixed(digits) + suffix;
}

export function calculateStyles({ changePercent }) {
    if (changePercent === undefined) {
        return {};
    }

    let rgbColor = changePercent > 0 ? '0,255,0' : '255,0,0';
    let rgbOpacity = Math.min(Math.abs(changePercent) * 20, 1);

    return { backgroundColor: `rgba(${rgbColor}, ${rgbOpacity})` };
}