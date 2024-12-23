"use client"

import { redirect } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

function SearchBar() {
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if(keyword != "") {
      redirect(`/explore/search?keyword=${encodeURIComponent(keyword)}`);
    }
    else {
      alert('검색어를 입력하세요.');
    }
  }

  return (
    <div className="w-full mx-auto mb-4">
            <form  onSubmit={handleSearch} className="w-full border p-2 rounded-full bg-neutral-100 flex flex-row">
                <input
                    type="text"
                    className="w-full bg-neutral-100 focus:outline-none"
                    placeholder="장소나 테마(예: 산책, 자연 등)를 검색해보세요"
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit"><FaSearch /></button>
            </form>
        </div>
  )
}

export default SearchBar