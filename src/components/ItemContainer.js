import React from 'react'
import { connect } from 'react-redux'
import { buyCake, buyIceCream } from '../redux'

function ItemContainer (props) {
  return (
    <>
      <h2>Item - {props.item}</h2>
      <div>
        <button onClick={props.buyItem}>Buy Items</button>
      </div>
    </>
  )
}

const mapStateToProps = (state, ownProps) => {
  const itemState = ownProps.cake
    ? state.cake.numOfCakes
    : state.iceCream.numOfIceCreams
  return {
    item: itemState
  }
}

export default connect(
  mapStateToProps
)(ItemContainer)
