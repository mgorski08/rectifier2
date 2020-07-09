import React from "react";
import axios from "../config/axios";


class ClientDropdown {
  state = {
    clients: [],
    selectedClient: "",
  };

  componentDidMount() {

    const fetchData = () => {
      axios
        .get('client/name')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let ClientsfromDatabase = data.map(client => {
            return {value: client, display: client};
          });
          this.setState({
            clients: [
              {
                value: "",
                display:
                  "(Select Clients name)"
              }
            ].concat(ClientsfromDatabase)
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

      return (
        <div>
          <select
            value={this.state.selectedClient}
            onChange={e =>
              this.setState({
                selectedClient: e.target.value,
                validationError:
                  e.target.value === ""
                    ? "Choose Client"
                    : ""
              })
            }
          >
            {this.state.clients.map(client => (
              <option
                key={client.value}
                value={client.value}
              >
                {client.display}
              </option>
            ))}
          </select>
          <div
            style={{
              color: "red",
              marginTop: "5px"
            }}
          >
            {this.state.validationError}
          </div>
        </div>
      );
    }
}

export default ClientDropdown;



