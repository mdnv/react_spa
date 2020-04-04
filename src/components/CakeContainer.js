import React from 'react'
import { connect } from 'react-redux'
import { buyCake } from '../redux'

function CakeContainer(props) {
  return (
    <div>
      <h2>Number of cakes {props.numOfCakes}</h2>
      <button onClick={props.buyCake}>Buy Cake</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    numOfCakes: state.numOfCakes
  }
}

const mapDispathToProps = dispath => {
  return {
    buyCake: () => dispath(buyCake())
  }
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CakeContainer)
