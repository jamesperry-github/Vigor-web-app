import React, { Component } from 'react';
import { getData, postData, destroyData } from '../../requests/request';
import { loadSpinner } from '../../components/spinner';

export default class SearchFood extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      queryTerm: "",
      queryCount: 0,
      RecipesContainer: [],
      from: 0,
      to: 20,
    }
  }

  fetchRecipesFromSearch = async () => {
    await this.setState({ loading: true });
    let { queryTerm, from, to } = this.state;
    //if (queryTerm && queryTerm !== "") {
    let path = `/search?app_id=b8db2e2a&app_key=065c22fe8ebf2f646c93412f8edca35c&q=${queryTerm}&from=${from}&to=${to}`;
    await getData(path, true).then(data => {
      if (data && queryTerm !== "") {
        this.setState({
          queryCount: data.count,
          RecipesContainer: data.hits,
          loading: false,
        })
      } else {
        this.setState({
          RecipesContainer: [],
          loading: false,
        })
      }
    }).catch(err => console.error(err));
    //}
  }

  handleInputChange = async (e, key) => {
    let { value } = e.target;
    await this.setState({ queryTerm: value });
    //console.log("VERIFY DATA", this.state.InsertData);
    // if (this.timeout) clearTimeout(this.timeout);
    // this.timeout = setTimeout(() => {
    //   //search function
    //   this.fetchRecipesFromSearch();
    // }, 300);
  }

  tableBody = () => {
    let { RecipesContainer, from, to } = this.state;
    if (RecipesContainer && RecipesContainer.length > 0) {
      return (
        RecipesContainer.map((itm, idx) => {
          from++;
          return (
            <tr key={idx}>
              <td scope="row"><b>{from}</b></td>
              <td>
                <img
                  src={itm.recipe.image}
                  style={{
                    height: "100px",
                    width: "100px"
                  }}
                />
              </td>
              <td>{itm.recipe.label}</td>
              <td>
                {itm.recipe.calories}
              </td>
            </tr>
          )
        })
      )
    }
  }

  gridContent = () => {
    let { loading, RecipesContainer } = this.state;
    if (loading) {
      return loadSpinner();
    } else {
      if (RecipesContainer.length > 0) {
        return (
          <div>
            <br />
            <table className="table table-hover table-light">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Recipe</th>
                  <th scope="col">Calories</th>
                </tr>
              </thead>
              <tbody>
                {this.tableBody()}
              </tbody>
            </table>
            {this.searchPagination()}
          </div>
        )
      }
    }
  }

  searchPagination = () => {
    //// *** 55008/20
    let linkItm = (number) => {
      return <li className="page-item">
        <a
          className="page-link"
          onClick={async () => {
            switch (number) {
              case "1":
                await this.setState({
                  from: 0,
                  to: 20
                });
                break;
              case "2":
                await this.setState({
                  from: 20,
                  to: 40
                });
                break;
              case "3":
                await this.setState({
                  from: 40,
                  to: 60
                });
                break;
              case "4":
                await this.setState({
                  from: 60,
                  to: 80
                });
                break;
              case "5":
                await this.setState({
                  from: 80,
                  to: 100
                });
                break;
              default:
                break;
            }
            this.fetchRecipesFromSearch();
          }}
        >{number}</a></li>
    }
    return (
      <div
        className="page-link-container"
      >
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link">Previous</a></li>
          {linkItm("1")}
          {linkItm("2")}
          {linkItm("3")}
          {linkItm("4")}
          {linkItm("5")}
          <li className="page-item"><a className="page-link">Next</a></li>
        </ul>
      </div>
    )
  }

  cardContent = () => {
    let { queryTerm } = this.state;
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title" style={{ display: "inline-block" }}>Search Recipes</h5>
        </div>
        <div className="card-body">
          {/* {this.gridContent()} */}
          <input
            placeholder="Search!"
            value={queryTerm}
            onChange={(e) => this.handleInputChange(e)}
          />
          <button
            onClick={this.fetchRecipesFromSearch}
          >GO!</button>
          {this.gridContent()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="search container">
        <div className="search full-card">
          <div className="search card">
            {this.cardContent()}
          </div>
        </div>
      </div >
    )
  }
}