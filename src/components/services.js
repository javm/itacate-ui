import React from 'react';
const Services = ({services}) => {
  return (
    <div>
    <center><h1> Services </h1></center>
    {
      services.map( (service) => {
        return(<div class="card">
                   <div class="card-body">
                       <h5 class="card-title">{service.name}</h5>
                       <h6 class="card-subtitle mb-2 text-muted">{service.description}</h6>
                       <p class="card-text">{service.provider || 'No owner'}</p>
                   </div>
        </div>);
      }
    )
  }
    </div>
  );
};
export default Services;
