import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../component/Redux/Features/getUserSlice';
//import { updateUser } from '../Redux/Features/getUserSlice'; // Import the update action

const Update = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // To redirect after update
    const [updateData, setUpdateData] = useState({
        title: '',
        description: '',
        status: '',
    });
    const { users } = useSelector((state) => state.userDetail);

    useEffect(() => {
        if (id) {
            const singleUser = users.find((ele) => ele.id === id);
            if (singleUser) {
                setUpdateData(singleUser);
            }
        }
    }, [id, users]);

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData)).then(() => {
            navigate('/read'); // Redirect to home or wherever after update
        });
    };

    return (
        <div className="container mt-5 w-50">
            <h2>Update POST {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={updateData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        value={updateData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-select"
                        id="status"
                        name="status"
                        value={updateData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Update;


// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'

// const Update = () => {
//     const { id } = useParams();
//     const [updateData, setUpdateData] = useState('')
//     const { users, loading } = useSelector((state) => state.userDetail.users);
//     // console.log(singleUser)

//     useEffect(() => {
//         if (id) {
//             const singleUser = users.find((ele) => ele.id === id);
//             setUpdateData(singleUser)
//         }
//     }, [])

//     return (
//         <div className="container mt-5  w-50">
//             <h2>Create POST {id}</h2>
//             <form >
//                 <div className="mb-3">
//                     <label htmlFor="title" className="form-label">Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         id="title"
//                         name="title"
//                         // value={title}
//                         // onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="description" className="form-label">Description</label>
//                     <textarea
//                         className="form-control"
//                         id="description"
//                         name="description"
//                         rows="3"
//                         // value={description}
//                         // onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="status" className="form-label">Status</label>
//                     <select
//                         className="form-select"
//                         id="status"
//                         name="status"
//                         // value={status}
//                         // onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select Status</option>
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                     </select>
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Update