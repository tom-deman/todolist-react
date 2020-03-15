import React, {
    useState,
    useEffect
} from 'react'
import PropTypes from 'prop-types'


const Todo = ({
    todoContent,
    editTodo,
    todoCheck,
    toggleCheckTodo,
    deleteTodo
}) => {
    const [ edit, setEdit ] = useState( false )


    useEffect( () => { setEdit( false ) }, [ todoContent ] )

    const putInputEdit = () =>
        setEdit( true )

    const editTodoCall = event => {
        if( event.key === 'Enter' ) {
            if( event.target.value !== todoContent ) {
                const value = event.target.value.trim()
                editTodo( value )
            }
            else setEdit( false )
        }
    }

    const todoClass   = 'rounded border border-gray-700 py-4 w-4/5 my-4 flex justify-between px-6'
    const inputClass  = 'border border-gray-700 py-1 px-2 rounded w-3/5 font-light text-sm text-center focus:outline-none'
    const buttonClass = 'rounded bg-red-400 hover:bg-red-500 text-white py-2 px-3 text-sm font-light focus:outline-none'


    return(
        <>
            <div className={ todoCheck ? `bg-green-300 ${ todoClass }` : todoClass }>
                <input
                    type      = "checkbox"
                    checked   = { todoCheck }
                    className = "mt-3"
                    onChange  = { () => toggleCheckTodo() }
                />
                { edit
                    ?
                        <input
                            defaultValue = { todoContent }
                            type         = "text"
                            className    = { inputClass }
                            onKeyDown    = { event => editTodoCall( event ) }
                        />
                    :
                        <p
                            className     = "mt-2 text-sm font-light"
                            onDoubleClick = { () => putInputEdit() }
                        >
                            { todoContent }
                        </p>
                }
                <button
                    className = { buttonClass }
                    onClick   = { () => deleteTodo() }
                >
                    delete
                </button>
            </div>
        </>
    )
}


Todo.propType = {
    todoContent    : PropTypes.string.isRequired,
    editTodo       : PropTypes.func.isRequired,
    todoCheck      : PropTypes.bool.isRequired,
    toggleCheckTodo: PropTypes.func.isRequired,
    deleteTodo     : PropTypes.func.isRequired
}


export default Todo
