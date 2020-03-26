import React, { Component } from 'react';
import RangeInputField from './components/RangeInputField';
import RadioInputField from './components/RadioInputField';
import axios from 'axios';
import './style/index.scss';
import Loading from './components/Loading';
import Results from './components/Results';

export class App extends Component {
  state = {
    isFetching: false,
    results: null,
    showResult: false,
    sex: 'male',
    st_age: 17,
    address: 'urban',
    famsize: 5,
    pstatus: 'together',
    medu: '0',
    fedu: '0',
    guardian: 'mother',
    traveltime: '<15min',
    studytime: '<2h',
    failures: 0,
    schoolsup: 'yes',
    famsup: 'yes',
    paid: 'yes',
    activities: 'yes',
    nursery: 'yes',
    higher: 'yes',
    internet: 'yes',
    romantic: 'yes',
    famrel: 0,
    freetime: 0,
    goout: 0,
    health: 0,
    absences: 0,
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
        />,
      );
    return radioButtons;
  };

  convertToNumber = group => {
    if (group === 'traveltime') {
      switch (this.state.traveltime) {
        case '<15min':
          return 1;
        case '15min-30min':
          return 2;
        case '30min-1h':
          return 3;
        case '>1h':
          return 4;
        default:
          return null;
      }
    } else if (group === 'studytime') {
      switch (this.state.studytime) {
        case '<2h':
          return 1;
        case '2h-5h':
          return 2;
        case '5h-10h':
          return 3;
        case '>10h':
          return 4;
        default:
          return null;
      }
    }
  };

  fetchData = () => {
    this.setState({ isFetching: true });
    const data = {
      Inputs: {
        input1: {
          ColumnNames: [
            'school',
            'sex',
            'age',
            'address',
            'famsize',
            'Pstatus',
            'Medu',
            'Fedu',
            'Mjob',
            'Fjob',
            'reason',
            'guardian',
            'traveltime',
            'studytime',
            'failures',
            'schoolsup',
            'famsup',
            'paid',
            'activities',
            'nursery',
            'higher',
            'internet',
            'romantic',
            'famrel',
            'freetime',
            'goout',
            'Dalc',
            'Walc',
            'health',
            'absences',
            'G1',
            'G2',
            'G3',
          ],
          Values: [
            [
              ' ', //school
              this.state.sex[0].toUpperCase(),
              this.state.st_age,
              this.state.address[0].toUpperCase(),
              this.state.famsize <= 3 ? 'LE3' : 'GT3',
              this.state.pstatus[0].toUpperCase(),
              this.state.medu,
              this.state.fedu,
              ' ', //mjob
              ' ', //fjob
              ' ', //reason
              this.state.guardian,
              this.convertToNumber('traveltime'),
              this.convertToNumber('studytime'),
              this.state.failures,
              this.state.schoolsup,
              this.state.famsup,
              this.state.paid,
              this.state.activities,
              this.state.nursery,
              this.state.higher,
              this.state.internet,
              this.state.romantic,
              this.state.famrel + 1,
              this.state.freetime + 1,
              this.state.goout + 1,
              '0', //dalc
              '0', //walc
              this.state.health + 1,
              this.state.absences,
              '0',
              '0',
              '0',
            ],
          ],
        },
      },
      GlobalParameters: {},
    };
    const url =
      'https://ussouthcentral.services.azureml.net/workspaces/8f7550b9671b4552a28c6704960ceab9/services/21ae30465f274f168ea305e5e1d36077/execute?api-version=2.0&details=true';
    axios.defaults.headers.Authorization =
      'Bearer g72tU+leOjIGyCuyk3+6Jd3AcB+b9OB9+tnkUnWACGY0mixvmfwGQ2C2cMGJLC4Fb0S1xtfekIeYJPIeuTKnDg==';
    axios
      .request({
        method: 'post',
        url: 'https://cors-anywhere.herokuapp.com/' + url,
        data: data,
      })

      .then(res => {
        const results = res.data.Results.output1.value.Values[0].slice(25);
        this.setState({ isFetching: false, showResult: true, results: results });
        //console.log(results);
      });
    //console.log('SENT DATA: ', data);
  };

  toggleResults = () => {
    this.setState({ showResult: !this.state.showResult });
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
      nursery,
      higher,
      internet,
      romantic,
      famrel,
      freetime,
      goout,
      health,
      absences,
    } = this.state;

    return (
      <React.Fragment>
        <div className="container">
          <h1 className="title">Student's Alcohol Consumption</h1>
          <div className="form-row">
            <div className="col-6">
              <p>Student's sex: </p>
              {this.radioButtonInputs(['male', 'female'], sex, 'sex')}
            </div>

            <div className="col-6">
              <p>Address:</p>
              {this.radioButtonInputs(['urban', 'rural'], address, 'address')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <label htmlFor="st_age" className="title">
                Student's age:
              </label>
              <input
                type="number"
                name="st_age"
                id="st_age"
                min="15"
                max="18"
                value={st_age}
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label htmlFor="famsize" className="title">
                Family size:
              </label>
              <input
                type="number"
                name="famsize"
                id="famsize"
                min="2"
                value={famsize}
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <p>Mother's education: </p>
              <select value={medu} onChange={this.handleInput} id="medu" className="custom-select">
                <option value="0">None</option>
                <option value="1">Primary education (4th grade)</option>
                <option value="2">5th to 9th grade</option>
                <option value="3">Secondary education</option>
                <option value="4">Higher education</option>
              </select>
            </div>

            <div className="col-6">
              <p>Father's education: </p>
              <select value={fedu} onChange={this.handleInput} id="fedu" className="custom-select">
                <option value="0">None</option>
                <option value="1">Primary education (4th grade)</option>
                <option value="2">5th to 9th grade</option>
                <option value="3">Secondary education</option>
                <option value="4">Higher education</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <p>Parent's cohabitation status:</p>
              {this.radioButtonInputs(['together', 'apart'], pstatus, 'pstatus')}
            </div>

            <div className="col-6">
              <p>Guardian:</p>
              {this.radioButtonInputs(['mother', 'father', 'other'], guardian, 'guardian')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <p>Home to school travel time:</p>
              {this.radioButtonInputs(
                ['<15min', '15min-30min', '30min-1h', '>1h'],
                traveltime,
                'traveltime',
              )}
            </div>

            <div className="col-6">
              <p>Weekly study time:</p>
              {this.radioButtonInputs(['<2h', '2h-5h', '5h-10h', '>10h'], studytime, 'studytime')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-4">
              <p>Extra educational support:</p>
              {this.radioButtonInputs(['yes', 'no'], schoolsup, 'schoolsup')}
            </div>

            <div className="col-4">
              <p>Family educational support:</p>
              {this.radioButtonInputs(['yes', 'no'], famsup, 'famsup')}
            </div>

            <div className="col-4">
              <p>Extra paid classes:</p>
              {this.radioButtonInputs(['yes', 'no'], paid, 'paid')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-4">
              <p>Extra-curricular activities:</p>
              {this.radioButtonInputs(['yes', 'no'], activities, 'activities')}
            </div>
            <div className="col-4">
              <p>Attended nursery school:</p>
              {this.radioButtonInputs(['yes', 'no'], nursery, 'nursery')}
            </div>
            <div className="col-4">
              <p>Wants to take higher education:</p>
              {this.radioButtonInputs(['yes', 'no'], higher, 'higher')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <p>Internet access at home:</p>
              {this.radioButtonInputs(['yes', 'no'], internet, 'internet')}
            </div>

            <div className="col-6">
              <p>With a romantic relationship:</p>
              {this.radioButtonInputs(['yes', 'no'], romantic, 'romantic')}
            </div>
          </div>

          <div className="form-row">
            <div className="col-6">
              <label htmlFor="absences" className="title">
                Number of school absences:
              </label>
              <input
                type="number"
                name="absences"
                id="absences"
                min="0"
                max="93"
                value={absences}
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label htmlFor="failures" className="title">
                Number of past class failures:
              </label>
              <input
                type="number"
                name="failures"
                id="failures"
                min="0"
                max="3"
                value={failures}
                onChange={this.handleInput}
                className="form-control"
              />
            </div>
          </div>
        </div>

        <div className="container-custom">
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
        </div>

        <div className="row">
          <button onClick={this.fetchData}>Get Results</button>
          {this.state.results && <button onClick={this.toggleResults}>Show Results</button>}
        </div>
        <Loading isLoading={this.state.isFetching} />

        <Results
          show={this.state.results && this.state.showResult}
          results={this.state.results}
          close={this.toggleResults}
        />
      </React.Fragment>
    );
  }
}

export default App;
