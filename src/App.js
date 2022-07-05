import { useState, useEffect } from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Persons from "./components/Persons"
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {

  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState(null)

  useEffect(() => {
    // console.log("effect")
    personService
      .getAll()
      .then(initialPersons => {
        console.log("promise fulfilled")
        setPersons(initialPersons)
      })
  }, [])

  console.log('render', persons.length, 'persons')




  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState(false)
  const [filterName, setFilterName] = useState('')

  const peopleToShow = !filter 
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(filterName.trim().toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    const currentNames = persons.map(person => person.name)
    
    if (currentNames.includes(newName.trim())) {
      if (window.confirm(`${newName} is already in phonebook, update number?`)) {
        const foundPerson = persons.find(person => person.name === newName.trim())
        return updatePerson(foundPerson)
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
       console.log(returnedPerson)
       setPersons(persons.concat(returnedPerson))
       setMessage(`Added ${returnedPerson.name}`)
       setTimeout(() => {
         setMessage(null)
       }, 5000)
       setNewName('')
       setNewNumber('')
     })
  }

  const updatePerson = (person) => {
    const changedPerson = { ...person, number: newNumber }
    console.log(person.id)
    personService
      .update(person.id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(prevPers => prevPers.id !== person.id ? prevPers : returnedPerson))
        setMessage(`Changed ${changedPerson.name}'s number`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        return
      })
      .catch(error => {
        console.log(error)
        setMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== person.id))
      })

      return 

  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleNameFilter = (event) => {
    // console.log(event.target.value)
    setFilter(true)
    setFilterName(event.target.value)
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (!window.confirm(`delete ${person.name}?`)) {
      return
    }
    console.log('deleted person', id)
    personService
    .deleteOne(id)
    setPersons(persons.filter(pers => pers.id !== id))
  }


  return (
    
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
      />
      <Filter
        filterName={filterName}   
        handleNameFilter={handleNameFilter}
      />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        peopleToShow={peopleToShow} 
        deletePerson={deletePerson}
      />
    </div>
  )
}


export default App