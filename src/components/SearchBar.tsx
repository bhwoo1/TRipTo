import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  return (
    <div className="w-full mx-auto mb-4">
            <form  className="w-full border p-2 rounded-full bg-neutral-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-neutral-100 focus:outline-none"
                    placeholder="장소나 테마(예: 산책, 자연 등)를 검색해보세요"
                />
                <button type="submit"><FaSearch /></button>
            </form>
        </div>
  )
}

export default SearchBar