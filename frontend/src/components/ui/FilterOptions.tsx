import React from 'react'

const FilterOptions = () => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filter Options</h2>
      <div className="space-y-2">
        <div>
          <label className="block mb-1 font-medium">Price Range</label>
          <input type="range" className="w-full" />
        </div>
        <div>
          <label className="block mb-1 font-medium">Room Type</label>
          <select className="w-full p-2 border rounded-md">
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Amenities</label>
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">WiFi</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Pool</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2">Parking</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterOptions