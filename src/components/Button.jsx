import React     from 'react'
import PropTypes from 'prop-types'

const buttonClass = 'text-sm hover:bg-blue-500 mx-4 py-2 px-4 text-white hover:text-white rounded focus:outline-none'


const Button = ({
    filter,
    match,
    filterTodos,
    children
}) =>
    <button
        className = { filter === match ? `${ buttonClass } bg-blue-500` : `${ buttonClass } bg-blue-300` }
        onClick   = { filterTodos }
    >
        { children }
    </button>


Button.propTypes = {
    filter     : PropTypes.string.isRequired,
    match      : PropTypes.string.isRequired,
    filterTodos: PropTypes.func.isRequired,
    children   : PropTypes.node.isRequired
}


export default Button
