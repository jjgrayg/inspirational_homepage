import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
    fetchQuote,
    selectQuote,
    selectAuthor,
    selectLoading,
    selectfailed
} from './quoteSlice';

export const QuoteDisplay = () => {
    const quote = useSelector(selectQuote);
    const author = useSelector(selectAuthor);
    const loading = useSelector(selectLoading);
    const failed = useSelector(selectfailed);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!quote)
            dispatch(fetchQuote());
    }, []);

    return (
        <div className="quote-display">
            {loading ? <p>Loading...</p> : failed ? <p>Failed to load quote...</p> : (
                <blockquote className="famous-quote">
                    <p>&quot;{quote}&quot;</p>
                    <p>-{author}</p>
                </blockquote>
            )}
        </div>
    )
}