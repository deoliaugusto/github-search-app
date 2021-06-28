import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Header from '../Header';
import './search.scss';

const Search = ({ isDisabled, handleSearch }) => (
  <Jumbotron className="w-100 mb-5">
    <Header />

    <InputGroup size="lg">
      <FormControl
        aria-label="Large"
        aria-describedby="inputGroup-sizing-sm"
        type="search"
        placeholder="digite o nome"
        disabled={isDisabled}
        onKeyUp={handleSearch}
      />
      {isDisabled && (
        <Spinner
          className="component-search__loader"
          animation="border"
          variant="dark"
        />
      )}
    </InputGroup>
  </Jumbotron>
);

export default Search;
