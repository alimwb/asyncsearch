import React, { Component } from "react";
import AsyncSelect from "react-select/lib/Async";
import { stateOptions } from "./docs/data";
import _ from "lodash";

export default class SingleSelect extends Component {
  constructor(props) {
    super(props);

    const wait = 3000; // milliseconds
    const loadOptions = inputValue => this.getAsyncOptions(inputValue);
    this.debouncedLoadOptions = _.debounce(loadOptions, wait);
  }

  getAsyncOptions(inputValue) {
    return new Promise((resolve, reject) => {
      const filtered = _.filter(stateOptions, o =>
        _.startsWith(_.toLower(o.label), _.toLower(inputValue))
      );
      resolve(filtered.slice(0, 3));
    });
  }

  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          defaultOptions
          isClearable
          className="basic-single"
          classNamePrefix="select"
          name="search"
          loadOptions={inputValue => this.debouncedLoadOptions(inputValue)}
        />

        <h3>Example 1 (with Bebounc)</h3>

        <ol>
          <li>Type "ala" (without quotes) into the select box above.</li>
          <li>Observe "Alabama" is an option.</li>
          <li>Observe "Alaska" is an option.</li>
          <li>Observe "American Samoa" is an option.</li>
        </ol>

        <p>
          ISSUE
          <br />
          Observed Behavior: "American Samoa" is visible.
          <br />
          Expected Behavior: Only Alabama and Alaska should be visble.
        </p>
      </div>
    );
  }
}
