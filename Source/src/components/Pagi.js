import React from 'react';
import {
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
  } from "reactstrap";

class Pagi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
        }
    }

    changePage = page => {
        this.setState({
            currentPage: page
        })
        this.props.changePageFunc(page);
    }

    render() {

        if (!this.props.data) {
            return (
                <></>
            )
        }
        let Components = [];
        for (let i = 0; i < this.props.data.length; i += 5) {
            if (Math.floor((i+6)/5)=== this.state.currentPage) {
                Components.push(
                    <PaginationItem className="active">
                        <PaginationLink
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                        >
                            {i/5+1}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else {
                Components.push(
                    <PaginationItem>
                        <PaginationLink
                            href="#pablo"
                            onClick={e => {e.preventDefault(); this.changePage(i/5+1)}}
                        >
                            {i/5+1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        }

        return (
            <>
                <CardFooter className="py-4">
                    <nav aria-label="...">
                        <Pagination
                            className="pagination justify-content-end mb-0"
                            listClassName="justify-content-end mb-0"
                        >
                        {Components}
                        </Pagination>
                    </nav>
                </CardFooter>

            </>
        )
    }
}

export default Pagi;