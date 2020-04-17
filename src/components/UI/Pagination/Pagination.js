import React from 'react';
import classes from './Pagination.module.css';

import ReactPaginate from 'react-paginate';

const Pagination = (props) => (
  <ReactPaginate
    pageCount={props.pageCount}
    initialPage={0}
    onPageChange={props.nextPageHandler}
    disableInitialCallback={true}
    pageRangeDisplayed={3}
    marginPagesDisplayed={3}
    previousLabel={'<'}
    nextLabel={'>'}
    containerClassName={classes.Pagination}
    pageClassName={classes.PaginationItem}
    breakClassName={classes.PaginationItem}
    previousClassName={classes.PaginationItem}
    nextClassName={classes.PaginationItem}
    pageLinkClassName={classes.PaginationItemText}
    previousLinkClassName={classes.PaginationItemText}
    nextLinkClassName={classes.PaginationItemText}
    breakLinkClassName={classes.PaginationItemText}
    activeClassName={classes.ActivePaginationItem}
    activeLinkClassName={classes.ActivePaginationItemText}
  />
);

export default Pagination;
