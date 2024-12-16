import React from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  return (
    <div className="w-[80px] mx-auto mb-4">
            <form  className="w-full border p-2 rounded-full bg-neutral-100-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-neutral-100-100 focus:outline-none"
                    placeholder="당신의 팀을 검색해서 찾아보세요."
                />
                <button type="submit"><p className="p-2"><FaSearch /></p></button>
            </form>
        </div>
  )
}

export default SearchBar