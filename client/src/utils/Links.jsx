import React from 'react';


import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

// Following links are using relative path ( '.' )
const links = [
    { text: 'my profile', path: '.', icon: <ImProfile /> },
    { text: 'new job', path: 'new-job', icon: <FaWpforms /> },
    { text: 'my jobs', path: 'my-jobs', icon: <MdQueryStats /> },
    { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
    // my clients
    // new schedule
    // my schedule
];

export default links;