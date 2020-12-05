import React, { Component, Fragment } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { destroyData } from '../../../requests/request';

export default class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      showModal: false,
    }
  }

  handleOpen = async () => {
    this.setState({
      showModal: true,
    });
  }

  handleDelete = async (id) => {
    //await this.setState({ loading: true });
    let path = `api/RemoveRecipe?recipeid=${id}`;
    let response = await destroyData(path, id).then(data => data).catch(err => console.error(err));
    if (response.ok) {
      this.props.Refresh();
    } else {
      console.log(response);
    }
  }

  render() {
    let { showModal } = this.state;
    return (
      <Fragment>
        <button
          type="button"
          className="btn btn-danger"
          style={{
            fontWeight: "bolder",
          }}
          onClick={this.handleOpen}
        >X</button>
        <Modal
          show={showModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header style={{ justifyContent: "center" }}>
            <Modal.Title>{`Delete ${this.props.Title}?`}</Modal.Title>
          </Modal.Header>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button variant="primary" onClick={() => this.handleDelete(this.props.RecipeId)}>Yes</Button>
            <Button variant="secondary" onClick={() => this.setState({ showModal: false })}>No</Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    )
  }
}