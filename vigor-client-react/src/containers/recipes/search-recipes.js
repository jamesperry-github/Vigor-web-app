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

  // searchResults = () => {
  //   let { loading, RecipesContainer, queryCount } = this.state;
  //   if (loading) {
  //     return loadSpinner();
  //   } else {
  //     let FoodDetail = (item, label = "") => {
  //       return <p
  //         className="detail-item"
  //         style={{
  //           fontSize: "80%"
  //         }}
  //       >{label} {item}</p>
  //     }
  //     return (
  //       <div>
  //         <p>Total: {queryCount}</p>
  //         <p>Response Length: {RecipesContainer.length}</p>
  //         <div className="recipe-display">
  //           {RecipesContainer.map((itm, idx) => {
  //             return (
  //               <div
  //                 className="card"
  //                 style={{
  //                   //height: "200px",
  //                   //width: "200px",
  //                   width: "25%",
  //                   float: "right"
  //                 }}
  //               >
  //                 <img
  //                   className="card-img-top"
  //                   style={{
  //                     height: "50%"
  //                   }}
  //                   src={itm.recipe.image}
  //                   alt="Card image cap"
  //                 />
  //                 <div className="card-body">
  //                   {FoodDetail(itm.recipe.label)}
  //                   {FoodDetail(itm.recipe.calories, "KCAL:")}
  //                   <a href="#" className="btn btn-primary">Go somewhere</a>
  //                 </div>
  //               </div>
  //             )
  //           })}
  //         </div>
  //       </div>
  //     )
  //   }
  // }

  tableBody = () => {
    let { RecipesContainer } = this.state;
    if (RecipesContainer && RecipesContainer.length > 0) {
      return (
        RecipesContainer.map((itm, idx) => {
          return (
            <tr key={idx}>
              <td scope="row"><b>{idx + 1}</b></td>
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
            <br/>
            <table className="table table-hover">
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
          </div>
        )
      }
    }
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