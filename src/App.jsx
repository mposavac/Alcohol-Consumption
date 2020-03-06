import React, { Component } from "react";
import RangeInputField from "./components/RangeInputField";
import RadioInputField from "./components/RadioInputField";
import "./style/index.scss";

export class App extends Component {
  state = {
    sex: "male",
    st_age: 8,
    address: "urban",
    famsize: 2,
    pstatus: "together",
    medu: "0",
    fedu: "0",
    guardian: "mother",
    traveltime: "<15min",
    studytime: "<2h",
    failures: 0,
    schoolsup: "yes",
    famsup: "yes",
    paid: "yes",
    activities: "yes",
    higher: "yes",
    internet: "yes",
    romantic: "yes",
    famrel: 0,
    freetime: 0,
    goout: 0,
    health: 0,
    absences: 0
  };

  handleInput = e => {
    if (e.target.name) this.setState({ [e.target.name]: e.target.value });
    else this.setState({ [e.target.id]: e.target.value });
  };

  radioButtonInputs = (options, input, group) => {
    let radioButtons = [];
    for (let i = 0; i < options.length; i++)
      radioButtons.push(
        <RadioInputField
          key={i + options[i] + group}
          input={input}
          name={options[i]}
          group={group}
          onChange={this.handleInput}
        />
      );
    return radioButtons;
  };

  render() {
    const {
      sex,
      st_age,
      address,
      famsize,
      pstatus,
      medu,
      fedu,
      guardian,
      traveltime,
      studytime,
      failures,
      schoolsup,
      famsup,
      paid,
      activities,
      higher,
      internet,
      romantic,
      famrel,
      freetime,
      goout,
      health,
      absences
    } = this.state;
    return (
      <div className="App">
        <div>
          <p>Student's sex</p>
          {this.radioButtonInputs(["male", "female"], sex, "sex")}
        </div>

        <div>
          <label htmlFor="st_age">Student's age</label>
          <input
            type="number"
            name="st_age"
            id="st_age"
            min="8"
            value={st_age}
            onChange={this.handleInput}
          />
        </div>

        <div>
          <p>Address</p>
          {this.radioButtonInputs(["urban", "rural"], address, "address")}
        </div>

        <div>
          <label htmlFor="famsize">Family size</label>
          <input
            type="number"
            name="famsize"
            id="famsize"
            min="2"
            value={famsize}
            onChange={this.handleInput}
          />
        </div>

        <div>
          <p>Parent's cohabitation status</p>
          {this.radioButtonInputs(["together", "apart"], pstatus, "pstatus")}
        </div>
        <div>
          <p>Mother's education: </p>
          <select value={medu} onChange={this.handleInput} id="medu">
            <option value="0">None</option>
            <option value="1">Primary education (4th grade)</option>
            <option value="2">5th to 9th grade</option>
            <option value="3">Secondary education</option>
            <option value="4">Higher education</option>
          </select>
        </div>

        <div>
          <p>Father's education: </p>
          <select value={fedu} onChange={this.handleInput} id="fedu">
            <option value="0">None</option>
            <option value="1">Primary education (4th grade)</option>
            <option value="2">5th to 9th grade</option>
            <option value="3">Secondary education</option>
            <option value="4">Higher education</option>
          </select>
        </div>

        <div>
          <p>Parent's cohabitation status</p>
          {this.radioButtonInputs(
            ["mother", "father", "other"],
            guardian,
            "guardian"
          )}
        </div>

        <div>
          <p>Home to school travel time</p>
          {this.radioButtonInputs(
            ["<15min", "15min-30min", "30min-1h", ">1h"],
            traveltime,
            "traveltime"
          )}
        </div>

        <div>
          <p>Weekly study time</p>
          {this.radioButtonInputs(
            ["<2h", "2h-5h", "5h-10h", ">10h"],
            studytime,
            "studytime"
          )}
        </div>

        <div>
          <label htmlFor="failures">Number of past class failures </label>
          <input
            type="number"
            name="failures"
            id="failures"
            min="0"
            max="4"
            value={failures}
            onChange={this.handleInput}
          />
        </div>

        <div>
          <p>Extra educational support</p>
          {this.radioButtonInputs(["yes", "no"], schoolsup, "schoolsup")}
        </div>

        <div>
          <p>Family educational support</p>
          {this.radioButtonInputs(["yes", "no"], famsup, "famsup")}
        </div>

        <div>
          <p>
            Extra paid classes within the course subject (Math or Portuguese)
          </p>
          {this.radioButtonInputs(["yes", "no"], paid, "paid")}
        </div>

        <div>
          <p>Extra-curricular activities</p>
          {this.radioButtonInputs(["yes", "no"], activities, "activities")}
        </div>

        <div>
          <p>Wants to take higher education</p>
          {this.radioButtonInputs(["yes", "no"], higher, "higher")}
        </div>

        <div>
          <p>Internet access at home</p>
          {this.radioButtonInputs(["yes", "no"], internet, "internet")}
        </div>

        <div>
          <p>With a romantic relationship</p>
          {this.radioButtonInputs(["yes", "no"], romantic, "romantic")}
        </div>

        <RangeInputField
          input={famrel}
          handleInput={this.handleInput}
          name="famrel"
          min={0}
          max={4}
          question="Quality of family relationships"
        />

        <RangeInputField
          input={freetime}
          handleInput={this.handleInput}
          name="freetime"
          min={0}
          max={4}
          question="Free time after school"
        />

        <RangeInputField
          input={goout}
          handleInput={this.handleInput}
          name="goout"
          min={0}
          max={4}
          question="Going out with friends"
        />

        <RangeInputField
          input={health}
          handleInput={this.handleInput}
          name="health"
          min={0}
          max={4}
          question="Current health status"
        />

        <RangeInputField
          input={absences}
          handleInput={this.handleInput}
          name="absences"
          min={0}
          max={4}
          question="Number of school absences"
        />
      </div>
    );
  }
}

export default App;
