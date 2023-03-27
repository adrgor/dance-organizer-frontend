import React, { useState } from 'react'

export default function ItemsSelect({items, isCheckboxSelected, isSearchEnabled, label, setValue}) {

  const [isListDisplayed, setIsListDisplayed] = useState(false)
  const [selectedItems, setSelectedItems] = useState(label)
  const [checkboxedItems, setCheckboxedItems] = useState({})
  const [searchBar, setSearchBar] = useState("")

  const handleOnClick = (item) => {
    if(!isCheckboxSelected) {
        setIsListDisplayed(false)
        setSelectedItems(item)
        setValue(item)
    } 
  }

  const handleOnChange = (e, item) => {
    checkboxedItems[item] = e.target.checked
    setCheckboxedItems(checkboxedItems)
    setValue(checkboxedItems)
  }

  const handleSearchBarChange = (e) => {
    setSearchBar(e.target.value)
  } 

  return (
    <>
        <button class="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 flex items-center justify-between" type="button" onClick={() => setIsListDisplayed(!isListDisplayed)}>{selectedItems}<svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
        {isListDisplayed &&
            <div class="mt-[-1rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                {isSearchEnabled && <div class="p-3">
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" onChange={handleSearchBarChange} value={searchBar} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder={label}/>
                    </div>
                </div>} 
                <ul class="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700">
                    {items.map( item => {
                        if(item.toUpperCase().includes(searchBar.toUpperCase())) {
                            return (
                                <li onClick={() => handleOnClick(item)}>
                                    <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                        {isCheckboxSelected && <input type="checkbox" onChange={e => handleOnChange(e, item)} id={item} defaultChecked={checkboxedItems[item]} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"/> }
                                        <label for={item} class="w-full ml-2 text-sm font-medium text-gray-900 rounded">{item}</label>
                                    </div>
                                </li>
                            )
                        } else return <></> 
                    })}
                </ul>
            </div>
        }
    </>
  )
}