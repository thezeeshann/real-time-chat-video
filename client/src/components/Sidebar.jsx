

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 min-h-screen text-white bg-gray-800">
    <div className="p-4">
      <h1 className="text-xl font-bold">Discord Clone</h1>
    </div>
    <div className="flex-1 p-4">
      <h2 className="mb-2 text-sm font-semibold">Friends</h2>
      <ul>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
          >
            <span className="flex-shrink-0">Icon</span>
            <span>Friend 1</span>
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
          >
            <span className="flex-shrink-0">Icon</span>
            <span>Friend 2</span>
          </a>
        </li>
        <li className="mb-2">
          <a
            href="#"
            className="flex items-center p-2 space-x-2 rounded hover:bg-gray-700"
          >
            <span className="flex-shrink-0">Icon</span>
            <span>Friend 3</span>
          </a>
        </li>
      </ul>
    </div>
    <div className="p-4">
      <button className="w-full text-blue-500">Buy Nitro</button>
    </div>
  </div>
  )
}

export default Sidebar