import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import CategorySelector from './CategorySelector'


class AccountContainer extends Component {
  constructor() {
    super()

    this.state = {
      transactions: [],
      activeCategory: "All"
    }

    this.handleChange = this.handleChange.bind(this)
    this.selectedTransactions = this.selectedTransactions.bind(this)
  }


  componentWillMount(){
    fetch( 'https://boiling-brook-94902.herokuapp.com/transactions')
      .then(res => res.json())
      .then(data => this.setState({transactions: data}))

  }

  selectedTransactions(){
    return this.state.transactions.filter(t => t.category.includes(this.state.activeCategory))
  }


  handleChange(event) {
    this.setState({
      activeCategory: event.target.value
    })
  }

  render() {
    const displayedTransactions = this.state.activeCategory === "All" ? this.state.transactions : this.selectedTransactions()

    return (
      <div className="ui grid container">

        <CategorySelector
          activeCategory={ this.state.activeCategory }
          handleChange={ this.handleChange }
        />

        <TransactionsList
          transactions={ displayedTransactions }
        />

      </div>
    )
  }
}

export default AccountContainer
