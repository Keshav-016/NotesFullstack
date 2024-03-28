export default function Navbar({ openModal }) {
    return (
        <div className="flex justify-center p-2 bg-gray-200">
            <div className="flex justify-between max-w-[60rem] w-full gap-4 mx-6">
                <input type="text" placeholder="Search..." className="border py-2 ps-4 w-5/6 rounded-lg outline-none" />
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white rounded-3xl w-1/6" onClick={openModal}>ADD</button>
            </div>
        </div>
    )
}