import React, {Fragment} from 'react';
import { useHistory, useLocation } from 'react-router-dom'

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import sortQuotes from "./utils";

const QuoteList = (props) => {
    const history = useHistory()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const isSortingASC = queryParams.get('sort') === 'asc'

    const sortedQuotes = sortQuotes(props.quotes, isSortingASC)

    const changeSortingHandler = () => {
        history.push('/quotes?sort=' + (isSortingASC ? 'desc' : 'asc'))
    }

    return (
        <Fragment>
            <div className={classes.sorting}>
                <button onClick={changeSortingHandler}>
                    Sort {isSortingASC ? 'Descending' : 'Ascending'}
                </button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </Fragment>
    );
};

export default QuoteList;
