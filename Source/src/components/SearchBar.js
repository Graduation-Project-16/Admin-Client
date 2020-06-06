import React from 'react';
import {
    Form,
    FormGroup,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input
} from 'reactstrap';
class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchFunction: props.searchFunction
        }
        this.handleChange.bind(this)
    }

    handleChange = e => {
        this.state.searchFunction(e.target.value);
    }

    render() {
        
        return (
            <Form className="navbar-search">
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Search" type="text" onChange={this.handleChange}/>
                </InputGroup>
              </FormGroup>
            </Form>
        )
    }
}

export default SearchBar