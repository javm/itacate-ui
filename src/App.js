import React, {Component} from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import './App.css';
import Services from './components/services';

const apiEndpoint = 'http://localhost:3000/graphql';
const axiosGraphQL = axios.create({baseURL: apiEndpoint});

const GET_SERVICES = `{ serviceMany {
  name
  schemaType
  updatedAt
  createdAt
} } `;

const TITLE = 'Itacate Services';

class App extends Component {

  onChange = event => {
    this.setState({newService: event.target.value});
  }

  addService = event => {
    let service = this.state.newService;
    let providerEmail = event.target.providerEmail.value;
    let consumerEmail = event.target.consumerEmail.value;

    alert('A service was submitted: ' + this.state.newService + ' '+ providerEmail);
    let mutation = `mutation {
      serviceCreateOne (record: {name: "${service}",
      provider: {
        name: "Jose",
        email: "${providerEmail}",
        userType: provider
      },
      consumer: {
        name: "Carlos",
        email: "${consumerEmail}",
        userType: consumer
      }
    }
  )
  {
    recordId
  }
}`;

axiosGraphQL.post('', {query: mutation}).then(result => {
  console.log(result)
}).catch(console.log);
}

  onSubmit = event => {
    event.preventDefault();
    this.addService(event);
  }

  render() {
    return (
     <div>
     <div>
       <h1>{TITLE}</h1>

       <form onSubmit={this.onSubmit}>
       <table size="100%">
       <tr>
       <td>
         <label htmlFor="url">
           Add new service
         </label>
         <input
           id="url"
           type="text"
           style={{ width: '300px' }}
           onChange={this.onChange}
         />
         </td>
         </tr>
         <tr>
         <td>
         <label>
         Provider email
         </label>
         <input
         id="email"
         type="email"
         name="providerEmail"
         />
         </td>
         </tr>
         <tr>
         <td>
         <label>Consumenr email</label>
         <input
         id="email"
         type="email"
         name="consumerEmail"
         />
         </td>
         </tr>
         </table>
         <button type="submit">Add</button>
       </form>
       <hr />
       {/* Here comes the result! */}
       </div>
       <div>
       <Services services={this.state.services} />
       </div>
     </div>
    );
  }

  state = {
    services: [],
    newService: ''
  };

  componentDidMount() {
    axiosGraphQL.post('', { query: GET_SERVICES })
    .then(result => {
      console.log(result);
      this.setState(() => ({
        services: result.data.data.serviceMany,
        errors: result.data.errors,
      }))
    }).catch(console.log);
  }
}

export default App;
