import React, { Component, Fragment } from 'react';
import { getData, putData } from '../../../requests/request';
import { loadSpinner } from '../../../components/spinner';
import { Modal, Button } from 'react-bootstrap';

export default class RecipeModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      List: [],
      showModal: false,
      canInsertData: false,
      canEditTitle: false,
      RecipeTitle: this.props.Title,
      InsertData: {
        Name: ""
      },
    }
  }

  fetchRecipeComponents = async (id) => {
    await this.setState({ loading: true });
    let path = `api/GetRecipeComponents?recipeid=${id}`;
    await getData(path).then(data => {
      if (data) {
        this.setState({
          List: data,
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
    let { loading, RecipeTitle } = this.state;
    await this.setState({ loading: true });
    let path = `api/UpdateRecipe?recipeid=${this.props.RecipeId}`;
    let dto = {
      Name: RecipeTitle,
    }
    let response = await putData(path, dto).then(data => data).catch(err => console.error(err));
    if (response.ok) {
      this.props.Refresh();
    } else {
      console.log(response);
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
    let { canInsertData, InsertData, List, ListCount } = this.state;
    let { Name } = InsertData;
    if (canInsertData) {
      return (
        <tr>
          <th scope="row">#</th>
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
        </tr>
      )
    } else {
      return;
    }
  }

  handleOpen = async () => {
    this.setState({
      showModal: true,
    });
    await this.fetchRecipeComponents(this.props.RecipeId);
  }

  tableBody = () => {
    let { List } = this.state;
    if (List && List.length > 0) {
      return (
        List.map((itm, idx) => {
          return (
            <tr key={idx}>
              <th scope="row">{idx + 1}</th>
              <td>{itm.Component}</td>
              <td>{itm.Measurement}</td>
              <td>{itm.Quantity}</td>
              <td>{itm.Calories}</td>
            </tr>
          )
        })
      )
    }
  }

  gridContent = () => {
    let { loading } = this.state;
    if (loading) {
      return loadSpinner();
    } else {
      return (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Component</th>
              <th scope="col">Measurement</th>
              <th scope="col">Quantity</th>
              <th scope="col">Calories</th>
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

  modalTitle = () => {
    let { canEditTitle, RecipeTitle } = this.state;
    if (canEditTitle) {
      return <input
        value={RecipeTitle}
        onChange={async (e) => {
          let { value } = e.target;
          await this.setState({ RecipeTitle: value });
          //console.log("VERIFY TITLE DTO", this.state.RecipeTitle);
        }}
      />
    } else return RecipeTitle;
  }

  modalContent = () => {
    let { canEditTitle, canInsertData } = this.state;
    return (
      <div>
        <Modal.Header>
          <Modal.Title>
            {this.modalTitle()}
              &nbsp;&nbsp;&nbsp;
              <i
              class="fa fa-pencil"
              style={{
                fontSize: "14px",
                cursor: "pointer",
                border: "1px solid black",
                borderRadius: "50%",
                padding: "5px",
              }}
              onClick={() => this.setState({ canEditTitle: !canEditTitle, RecipeTitle: this.props.Title })}
            ></i>
          </Modal.Title>
          <button
            type="button"
            class="btn btn-success"
            style={{
              float: "right",
              borderRadius: "50%",
              fontWeight: "bolder",
            }}
            onClick={() => this.setState({ canInsertData: !canInsertData, InsertData: { Name: "" } })}
          >+</button>
        </Modal.Header>
        <Modal.Body>
          {this.gridContent()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>
            Close
            </Button>
          <Button variant="primary" onClick={this.handleSubmit}>Understood</Button>
        </Modal.Footer>
      </div>
    )
  }

  render() {
    let { showModal } = this.state;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={this.handleOpen}
        >Manage</button>
        <Modal
          show={showModal}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          {this.modalContent()}
        </Modal>
      </Fragment>
    )
  }
}