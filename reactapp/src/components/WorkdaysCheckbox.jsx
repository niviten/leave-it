import React, { useState, forwardRef, useImperativeHandle } from 'react';

const WorkdaysCheckbox = forwardRef((props, ref) => {
    const allDays = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
    ];

    const [checkedDays, setCheckedDays] = useState([
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    ]);

    const handleChange = (day) => {
        setCheckedDays(prev =>
            prev.includes(day)
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    useImperativeHandle(ref, () => ({
        getSelectedDays: () => checkedDays
    }));

    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            {allDays.map((day) => (
                <li key={day}>
                    <label>
                        <input
                            type="checkbox"
                            checked={checkedDays.includes(day)}
                            onChange={() => handleChange(day)}
                        />
                        {day}
                    </label>
                </li>
            ))}
        </ul>
    );
});

export default WorkdaysCheckbox;
