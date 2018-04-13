import React from 'react';
import { Header, Container, Card } from 'semantic-ui-react';
import axios from 'axios';

class Home extends React.Component {
  state = { eps: {} }

  componentDidMount() {
    axios.get('https://api.got.show/api/episodes')
      .then( res => {
        this.setState({ eps: res.data })
        // console.log(this.state.eps); // comes back as an array of hashes
      })
      .catch(err => {
        // TODO: handle client side errors better. Maybe a use the Flash Component?
        console.log(err.response);
      });
  }

  render() {
    const { eps = {} } = this.state;

    { eps[0] ? console.log(eps[0].director) : null }
    return (
      <Container>
      <Header as='h1' textAlign='center'>G.O.T. Eps</Header>
        { eps[0] ?
          <Card.Group>
            { eps.map((ep, i) => {
              return (
                <Card key={i}>
                  <Card.Content>
                    <Card.Header>
                      {ep.name}
                    </Card.Header>
                    <Card.Meta>
                      <span className='date'>
                        Director: {ep.director}
                      </span>
                    </Card.Meta>
                      { ep.characters.map((char, i) =>
                          <Card.Description key={i}>{char}</Card.Description>
                      ) }
                  </Card.Content>
                  <Card.Content extra>
                    <a>
                    Seson: {ep.season}
                    </a>
                  </Card.Content>
                </Card>
              )
            }) }
          </Card.Group>
          :
          null
        }
      </Container>
    )
  }
}

export default Home;
