import React, { Component, Fragment } from 'react';
import RecipeModal from './components/recipe-component-modal';
import DeleteModal from './components/delete-recipe-modal';
import { getData, postData, destroyData } from '../../requests/request';
import { loadSpinner } from '../../components/spinner';

export default class UserRecipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      List: [],
      showModal: false,
      setModalShow: false,
      canInsert: false,
      InsertData: {
        Name: ""
      },
    }
  }

  componentDidMount() {
    this.fetchRecipes();
  }

  fetchRecipes = async () => {
    await this.setState({ loading: true });
    let path = "api/GetRecipes";
    await getData(path).then(data => {
      if (data) {
        this.setState({
          List: data,
          ListCount: data.length,
          loading: false
        })
      } else {
        this.setState({
          List: [],
          loading: false
        })
      }
    }).catch(err => console.error(err));
  }

  handleSubmit = async () => {
    await this.setState({ loading: true });
    let { loading, InsertData } = this.state;
    let path = "api/CreateRecipe";
    InsertData.UserId = JSON.parse(sessionStorage.LOGGED_IN_USER).UserId;
    let response = await postData(path, InsertData).then(data => data).catch(err => console.error(err));
    if (response.ok) {
      await this.setState({ InsertData: { Name: "" }, canInsert: false });
      this.fetchRecipes();
    } else {
      console.log(response);
      this.setState({ loading: false });
    }
  }

  tableBody = () => {
    let { List } = this.state;
    if (List && List.length > 0) {
      return (
        List.map((itm, idx) => {
          return (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{itm.Name}</td>
              <td>
                <RecipeModal
                  RecipeId={itm.RecipeId}
                  Title={itm.Name}
                  Refresh={this.fetchRecipes}
                />
              </td>
              <td>
                <DeleteModal
                  RecipeId={itm.RecipeId}
                  Title={itm.Name}
                  Refresh={this.fetchRecipes}
                />
              </td>
            </tr>
          )
        })
      )
    }
  }

  gridContent = () => {
    let { loading, List } = this.state;
    if (loading) {
      return loadSpinner();
    } else {
      return (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Recipe</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.tableBody()}
            {this.InsertField()}
          </tbody>
        </table>
      )
    }
  }

  handleInputChange = async (e, key) => {
    let { value } = e.target;
    let InsertData = { ...this.state.InsertData };
    InsertData[key] = value;
    await this.setState({ InsertData });
    //console.log("VERIFY DATA", this.state.InsertData);
  }

  InsertField = () => {
    let { canInsert, InsertData, List, ListCount } = this.state;
    let { Name } = InsertData;
    if (canInsert) {
      return (
        <tr>
          <th scope="row">{List.length + 1}</th>
          <td>
            <input
              placeholder="Recipe Name!"
              value={Name}
              onChange={(e) => this.handleInputChange(e, "Name")}
            />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handleSubmit}
            >✔</button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              style={{
                fontWeight: "bolder",
              }}
              onClick={() => this.setState({ canInsert: !this.state.canInsert, InsertData: { Name: "" } })}
            >X</button>
          </td>
        </tr>
      )
    } else {
      return;
    }
  }

  cardContent = () => {
    return (
      <div>
        <div className="card-header">
          <h5 className="card-title" style={{ display: "inline-block" }}>Recipes</h5>
          <button
            type="button"
            class="btn btn-success"
            style={{
              float: "right",
              borderRadius: "50%",
              fontWeight: "bolder",
            }}
            onClick={() => this.setState({ canInsert: !this.state.canInsert, InsertData: { Name: "" } })}
          >+</button>
        </div>
        <div className="card-body">
          {this.gridContent()}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="recipes container">
        <div className="recipes full-card">
          <div className="recipes card">
            {this.cardContent()}
          </div>
        </div>
      </div >
    )
  }
}