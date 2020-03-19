import React, {
    StrictMode,
    useState
} from 'react'


import './assets/css/tailwind.css'

import Button from './components/Button'
import Input  from './components/Input'
import Todo   from './components/Todo'


const App = () => {
    const [ todosTabs, setTodosTabs ] = useState( [] )
    const [ error, setError ]         = useState( false )
    const [ wichError, setWichError ] = useState( [] )
    const [ filter, setFilter ]       = useState( 'All' )
    const [ key, setKey ]             = useState( 1 )


    const todo = a => {
        return(
            <Todo
                key             = { a.key }
                todoCheck       = { a.completed }
                todoContent     = { a.content }
                toggleCheckTodo = { () => toggleCheckTodo( a.content ) }
                deleteTodo      = { () => deleteTodo( a.content ) }
                editTodo        = { ( value ) => editTodo( value, a.content ) }
            />
        )
    }


    const buttonTabs = [
        'All',
        'To do',
        'Done'
    ]


    const startTimerError = () => {
        setError( true )
        setTimeout( () => setError( false ) , 2000 )
    }

    const uniqueId = () =>
        Math.random().toString( 36 ).substr( 2, 9 )

    const toggleCheckTodo = content => {
        const index  = todosTabs.findIndex( el => el.content === content )
        const newTab = Array.from( todosTabs )
        newTab[ index ].completed = !newTab[ index ].completed
        setTodosTabs([ ...newTab ])
    }

    const deleteTodo = ( content ) => {
        const index  = todosTabs.findIndex( el => el.content === content )
        const newTab = Array.from( todosTabs )
        newTab.splice( index, 1 )
        setTodosTabs([ ...newTab ])
    }

    const filterTodos = element => {
        switch( element ) {
            case 'All'  : setFilter( 'All' )
                break
            case 'To do': setFilter( 'To do' )
                break
            case 'Done' : setFilter( 'Done' )
                break
            // no default
        }
    }


    const addTodo = event => {
        if( event.key === 'Enter' ) {
            if( !event.target.value.trim() ) {
                startTimerError()
                setWichError( 'Error - Enter at least one charachter' )
            }
            else if( event.target.value.length >= 80 ) {
                startTimerError()
                setWichError( 'Error - This todo is too long' )
            }

            else if( event.target.value.trim() && event.target.value.length < 80 ) {
                const todo = event.target.value.trim()

                if ( todosTabs.some( element => element.content === todo ) ) {
                    startTimerError()
                    setWichError( 'Error - This todo is already taken' )
                }
                else {
                    setTodosTabs([ ...todosTabs, {
                        content  : todo,
                        id       : uniqueId(),
                        key      : key,
                        edited   : false,
                        completed: false
                    } ])
                    setKey( key + 1 )
                    setWichError( '' )
                    event.target.value= ''
                }
            }
        }
    }


    const editTodo = ( value, content ) => {
        if( !value.trim() ) {
            startTimerError()
            setWichError( 'Error - Enter at least one charachter' )
        }
        else if( value.length >= 80 ) {
            startTimerError()
            setWichError( 'Error - This todo is too long' )
        }
        else if( value.trim() && value.length < 80 ) {
            const todo = value.trim()

            if( todosTabs.length > 0 ) {
                if ( todosTabs.some( element => element.content === todo ) ) {
                    startTimerError()
                    setWichError( 'Error - This todo is already taken' )
                }
                else {
                    const index = todosTabs.findIndex( el => el.content === content )
                    const newTab = Array.from( todosTabs )
                    newTab[ index ].content = todo
                    newTab[ index ].edited  = true
                    setTodosTabs([ ...newTab ])
                }
            }
        }
    }


    return(
        <StrictMode>
            <h1 className="text-center text-2xl font-light mt-12 text-gray-700">
                To do list - React
            </h1>

            <div className="w-full flex justify-center">
                <div className="mt-16 w-64 w-1/4 flex justify-center">
                    { buttonTabs.map( ( element, index ) => 
                        <Button
                            key         = { index }
                            filterTodos = { () => filterTodos( element ) }
                            filter      = { filter }
                            match       = { element }
                        >
                            { element }
                        </Button>
                    ) }
                </div>
            </div>

            <div className="flex justify-center mt-8 mb-6">
                <Input addTodo={ event => addTodo( event ) } />
            </div>

            <div className="h-10">
                { error &&
                    <p className="text-red-300 text-sm text-center">
                        { wichError }
                    </p>
                }
            </div>

            <hr className="border-gray-700 w-4/5 m-auto mb-16" />

            <div className="flex justify-center flex-wrap">
                { filter === 'All' && todosTabs
                    .map( ( element, index ) =>
                        todo( element, index )
                    )
                }
                { filter === 'To do' && todosTabs
                    .filter( element => !element.completed )
                    .map( ( element, index ) =>
                        todo( element, index )
                    )
                }
                { filter === 'Done' && todosTabs
                    .filter( element => element.completed )
                    .map( ( element, index ) =>
                        todo( element, index )
                    )
                }
            </div>

        </StrictMode>
    )
}


export default App
