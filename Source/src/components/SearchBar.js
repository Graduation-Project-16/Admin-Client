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
        super(props)
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
                  <Input placeholder="Search" type="text" />
                </InputGroup>
              </FormGroup>
            </Form>
        )
    }
}

export default SearchBar