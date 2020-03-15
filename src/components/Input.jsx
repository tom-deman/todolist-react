import React     from 'react'
import PropTypes from 'prop-types'


const Input = ({ addTodo }) =>
    <input
        type        = "text"
        className   = "border border-gray-700 text-sm font-thin text-center w-4/5 py-3 rounded focus:outline-none"
        placeholder = "Enter your todo here and press enter"
        onKeyDown   = { event => addTodo( event ) }
    />


Input.propTypes = {
    addTodo: PropTypes.func
}

export default Input
