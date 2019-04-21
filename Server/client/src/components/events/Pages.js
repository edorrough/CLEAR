import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

class Pages extends Component {
    state = {
        pager: {},
        initialPage: 1
    }

    componentWillMount = () => {
        // set page if items array isn't empty
        if(this.props.events && this.props.events.length) {
            this.setPage(this.state.initialPage);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // reset page if items array has changed
        if (this.props.events !== prevProps.events) {
            this.setPage(this.state.initialPage);
        }
    }

    setPage = (page) => {
        let events = this.props.events;
        let pager = this.state.pager;

        // get new pager object for specified page
        pager = this.getPager(events.length, page);

        // get new page of items from items array
        let pageOfItems = events.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
    }

    getPager = (totalItems, currentPage, pageSize) => {
        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        let totalPages;
        if(this.props.mobileVersion) {
            // debugger
            totalPages = Math.ceil(totalItems / 50);
        } else {
            totalPages = Math.ceil(totalItems / pageSize);
        }

        let startPage, endPage;

        if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        let pages = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages 
        };
    }

    render() {
        let pager = this.state.pager;

        if (!pager.pages || pager.pages.length <= 1) {
            // don't display pager if there is only 1 page
            return null;
        }

        return (
            <div className="ui pagination menu">
                <Link
                    to="#"
                    className={pager.currentPage === 1 ? 'disabled item' : 'item'}
                    onClick={() => this.setPage(1)}
                >First</Link>
                <Link
                    to="#"
                    className={pager.currentPage === 1 ? 'disabled item' : 'item'}
                    onClick={() => this.setPage(pager.currentPage - 1)}
                >Previous</Link>
                {pager.pages.map((page, index) => 
                    <NavLink
                        to="#"
                        key={index}
                        className={pager.currentPage === page ? 'active item' : 'item'}
                        onClick={() => this.setPage(page)}
                    >{page}</NavLink>
                )}
                <Link
                    to="#"
                    className={pager.currentPage === pager.totalPages ? 'disabled item' : 'item'}
                    onClick={() => this.setPage(pager.currentPage + 1)}
                >Next
                </Link>
                <Link
                    to="#"
                    className={pager.currentPage === pager.totalPages ? 'disabled item' : 'item'}
                    onClick={() => this.setPage(pager.totalPages)}
                >Last
                </Link>
            </div>
        )
    }
}

Pages.propTypes = {
    onChangePage: PropTypes.func,
    initialPage: PropTypes.number,
    events: PropTypes.array
}

export default Pages