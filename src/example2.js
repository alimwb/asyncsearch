import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";

export default class SingleSelect extends Component {
  loadOptions(inputValue) {
    return fetch(
      `http://jsonplaceholder.typicode.com/posts?userId=${inputValue}`
    ).then((res) => res.json());
  }
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isClearable
          isMulti
          className="basic-single"
          classNamePrefix="select"
          name="search"
          loadOptions={this.loadOptions}
        />
      </div>
    );
  }
}
