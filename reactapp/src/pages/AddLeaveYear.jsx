import React, { useRef, useState } from 'react';
import WorkdaysCheckbox from '../components/WorkdaysCheckbox';

function AddLeaveYear() {
    const [leaveTypeList, setLeaveTypeList] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const yearRef = useRef(null);
    const nameRef = useRef(null);
    const workdaysRef = useRef();
    const leaveTypeRef = useRef(null);

    function addLeaveType() {
        const leaveType = leaveTypeRef.current.value.trim();
        if (leaveType === '') {
            return;
        }
        setLeaveTypeList(prev => [...prev, { name: leaveType, count: 0 }]);
        leaveTypeRef.current.value = '';
    }

    function removeLeaveType(idxToDel) {
        setLeaveTypeList(prev => prev.filter((_, idx) => idx !== idxToDel));
    }

    function onChangeLeaveTypeCount(e, idx) {
        setLeaveTypeList(prev => {
            const updated = [...prev];
            updated[idx] = { ...updated[idx], count: e.target.value };
            return updated;
        });
    }

    function createLeaveYear() {
        const year = parseInt(yearRef.current.value);
        const name = nameRef.current.value;
        const workdays = workdaysRef.current.getSelectedDays();

        if (year < 1900 || year > 2100) {
            setErrMsg('Year should be between 1900 and 2100');
            return;
        }
        if (!name) {
            setErrMsg('Name is mandatory');
            return;
        }
        if (workdays.length === 0) {
            setErrMsg('Please select at least one workdays');
            return;
        }
        if (leaveTypeList.length === 0) {
            setErrMsg('Please add at least one leave type');
            return;
        }
        for (let i = 0; i < leaveTypeList.length; i++) {
            leaveTypeList[i].count = parseInt(leaveTypeList[i].count);
            if (leaveTypeList[i].count < 0) {
                setErrMsg('Leave type count should not be less than 0');
                return;
            }
        }

        console.log({ year, name, workdays, leaveType: leaveTypeList });
    }

    return <>
        <h3>Create leave year</h3>
        <hr />
        <table>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="year">Year: </label>
                    </td>
                    <td>
                        <input id="year" type="number" ref={yearRef} min="1900" max="2100" />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="name">Name: </label>
                    </td>
                    <td>
                        <input id="name" type="text" ref={nameRef} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="workdays">Workdays: </label>
                    </td>
                    <td>
                        <WorkdaysCheckbox ref={workdaysRef} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="leaveType">Leave type: </label>
                    </td>
                    <td>
                        <input type="text" id="leaveType" ref={leaveTypeRef} />
                    </td>
                    <td>
                        <button onClick={() => addLeaveType()}>Add</button>
                    </td>
                </tr>
                <tr>
                    <td />
                    <td colSpan={3}>
                        <ul
                            id="leaveTypeList"
                            style={{ listStyleType: "none", paddingLeft: 0 }}
                        >
                            {leaveTypeList.map((item, idx) => (
                                <li key={idx}>
                                    <span style={{ marginRight: 10 }}>{item.name}:</span>
                                    <input
                                        type="number"
                                        onChange={(e) => onChangeLeaveTypeCount(e, idx)}
                                        style={{ width: '7ch', marginRight: 10 }}
                                        placeholder="count"
                                    />
                                    <button onClick={() => removeLeaveType(idx)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </td>
                </tr>
            </tbody>
        </table>
        <br />
        <button onClick={createLeaveYear}>
            Create leave year
        </button>
        <br />
        {errMsg && <p style={{ color: 'red' }}>{errMsg}</p>}
    </>
}

export default AddLeaveYear;
