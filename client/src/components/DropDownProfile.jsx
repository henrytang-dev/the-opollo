import './components.css'
import { Link } from 'react-router-dom'

const DropDownProfile = ({logOut, open, toggleModal, firstName, lastName, username}) => {

    return (
        <>
            <ul className={`${open ? 'list' : 'nolist'} dropdown flex flex-col border-2 rounded-[10px] absolute top-[3.5rem] z-[1000] right-[-.5rem] items-center h-[13rem] w-[12rem] bg-white`}>
                <li className="w-[7.5rem] flex flex-col justify-center items-center h-[7rem]">
                    <p className="font-[600] text-[1.1rem]">{firstName + " " + lastName}</p>
                    <p className="text-[0.8rem] opacity-[0.3] text-[dark-gray]">{"@" + username}</p>
                </li>
                <li className=" w-[7.5rem] flex cursor-pointer items-center gap-2 justify-center border-gray border-t-[1px] h-[3rem]" onClick={toggleModal}>
                    <svg viewBox="0 0 24 24" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="9" r="3" stroke="#000000" stroke-width="1.5"></circle> <path d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    <p>Profile</p>
                </li>
                <li className="w-[7.5rem] flex cursor-pointer items-center gap-2 justify-center h-[3rem] border-gray border-t-[1px] mb-[1rem]">
                    <svg viewBox="0 0 24 24" width="20px" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
                    <Link to='/auth' onClick={logOut}>Logout</Link>
                </li>
            </ul>
        </>
    )
}

export default DropDownProfile